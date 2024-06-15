import React, { useEffect, useState } from "react";
import { NativeBaseProvider, Box, Image, VStack, HStack, ScrollView, Text, Divider, Button, Center, Modal, Spinner } from "native-base";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

const MotorcycleDetails = ({ route }) => {
  const { motorcycle } = route.params; // Obtém o objeto motorcycle passado via navegação

  useEffect(() => {
    console.log("Motorcycle details:", motorcycle);
  }, [motorcycle]);

  // Filtra as chaves numéricas que representam URLs de imagens
  const imageKeys = Object.keys(motorcycle).filter(key => !isNaN(key));
  // Mapeamento de cores
  const colorMapping = {
    Branco: 'white',
    Preto: 'black',
    Vermelho: 'red',
    Azul: 'blue',
    Verde: 'green',
    Amarelo: 'yellow',
    Laranja: 'orange',
    Roxo: 'purple',
    Prata: 'silver',
    Cinza: 'gray',
    Marrom: 'brown',
    Bege: 'beige',
    Dourado: 'gold',
    Rosa: 'pink',
    Outra: 'darkgray', // Usar uma cor padrão para "Outra"
  };

  // Obter a cor correspondente do mapeamento, ou usar 'darkgray' como padrão
  const textColor = colorMapping[motorcycle.cor] || 'darkgray';

  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState({});
  const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);
  const [datesSelected, setDatesSelected] = useState(false);
  const [rangeStart, setRangeStart] = useState(null); // Data de início do intervalo
  const [rangeEnd, setRangeEnd] = useState(null); // Data de fim do intervalo
  const [processingPayment, setProcessingPayment] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const handleDayPress = (date) => {
    const today = new Date().toISOString().split('T')[0];
    const selectedDate = date.dateString;

    // Verifique se a data selecionada não é menor que a data atual
    if (selectedDate < today) {
      return;
    }

    const newDates = { ...selectedDates };

    // Se não houver uma data inicial de intervalo, define-a
    if (!rangeStart) {
      newDates[selectedDate] = { selected: true, color: 'blue' };
      setRangeStart(selectedDate);
      setRangeEnd(selectedDate); // Também define como data final para permitir um único dia
      setDatesSelected(true);
    } else {
      const start = new Date(rangeStart);
      const end = new Date(selectedDate);

      if (start <= end) {
        // Verifica se o usuário clicou novamente na data final para desmarcar o intervalo
        if (selectedDate === rangeEnd) {
          // Desmarcar todas as datas no intervalo
          let currentDate = start;
          while (currentDate <= end) {
            const formattedDate = currentDate.toISOString().split('T')[0];
            delete newDates[formattedDate];
            currentDate.setDate(currentDate.getDate() + 1);
          }
          setSelectedDates({});
          setRangeStart(null);
          setRangeEnd(null);
          setDatesSelected(false);
        } else {
          // Preenche todas as datas entre o início e o fim
          let currentDate = start;
          while (currentDate <= end) {
            const formattedDate = currentDate.toISOString().split('T')[0];
            newDates[formattedDate] = { selected: true, color: 'blue' };
            currentDate.setDate(currentDate.getDate() + 1);
          }
          setRangeEnd(selectedDate);
        }
      } else {
        // Se o usuário clicar em uma data antes da data de início, reseta e começa novo intervalo
        newDates[selectedDate] = { selected: true, color: 'blue' };
        setRangeStart(selectedDate);
        setRangeEnd(selectedDate); // Permite um único dia
      }

      setDatesSelected(true); // Define como true quando um intervalo é selecionado
    }

    setSelectedDates(newDates);
  };

  // Função para calcular a diferença de dias entre duas datas
  const calculateDaysBetween = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1; // Inclui o dia final na contagem
  };

  // Função para formatar datas no formato "DD/MM/YYYY"
  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  // Formatar as datas para exibição no modal de checkout
  const formatSelectedDates = () => {
    if (!rangeStart || !rangeEnd) return '';

    const totalDays = calculateDaysBetween(rangeStart, rangeEnd);
    const startDateFormatted = formatDate(rangeStart);
    const endDateFormatted = formatDate(rangeEnd);

    // Se a data de início e a data de fim forem iguais, considera como um único dia
    if (rangeStart === rangeEnd) {
      return `Data selecionada: ${startDateFormatted}\nTotal de dias: 1`;
    }

    return `Data de início: ${startDateFormatted}\nData de fim: ${endDateFormatted}\nTotal de dias: ${totalDays}`;
  };

  // Calcular o valor total da locação
  const calculateTotalPrice = () => {
    if (!rangeStart || !rangeEnd) return 0;

    const totalDays = calculateDaysBetween(rangeStart, rangeEnd);
    const pricePerDay = parseFloat(motorcycle.preco);

    return totalDays * pricePerDay;
  };

  // Função para processar o pagamento
  const processPayment = () => {
    setProcessingPayment(true);

    // Simular o atraso do processamento do pagamento
    setTimeout(() => {
      setProcessingPayment(false);
      setSuccessModalVisible(true);
    }, 4000);
  };

  return (
    <NativeBaseProvider>

      {/* Exibe as imagens da moto em um ScrollView horizontal */}
      <HStack space={2} alignItems="center" justifyContent="center" m={5}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {imageKeys.map((key, index) => (
            <Image
              key={index}
              source={{ uri: motorcycle[key] }}
              alt={`Image ${index}`}
              size="2xl"
              resizeMode="cover"
              borderRadius={8}
              marginRight={2}
            />
          ))}
        </ScrollView>
      </HStack>

      <Box borderWidth={3} borderColor="gray.100" borderRadius={16} p={1} bg="white" m={5} shadow={5} flex={1}>
        {/* Detalhes da Motocicleta */}
        <Text fontSize="2xl" fontWeight="bold" color="primary.500" mb={4} textAlign="center">
          {motorcycle.fabricante} {motorcycle.modelo}
        </Text>

        {/* Duas colunas de atributos */}
        <HStack justifyContent="space-between">
          {/* Primeira Coluna */}
          <VStack space={4} flex={1}>
            <Box alignItems="center">
              <Ionicons name="calendar-outline" size={24} color="gray" />
              <Text fontSize="md" mt={2}> {motorcycle.ano}</Text>
            </Box>
            <Divider />
            <Box alignItems="center">
              <MaterialCommunityIcons name="engine-outline" size={24} color="black" />
              <Text fontSize="md" mt={2}> {motorcycle.cilindradas} CC</Text>
            </Box>
            <Divider />
            <Box alignItems="center">
              <Ionicons name="color-palette-outline" size={24} color="gray" />
              <Text fontSize="md" mt={2} style={{ color: textColor, fontWeight: 700 }}>{motorcycle.cor}</Text>
            </Box>
            <Divider />
          </VStack>

          {/* Segunda Coluna */}
          <VStack space={4} flex={1}>
            <Box alignItems="center">
              <Ionicons name="cash-outline" size={24} color="green" />
              <Text fontSize="md" mt={2}>R$ {motorcycle.preco}/dia</Text>
            </Box>
            <Divider />
            <Box alignItems="center">
              <Ionicons name="speedometer-outline" size={24} color="blue" />
              <Text fontSize="md" mt={2}>{motorcycle.quilometragem} km</Text>
            </Box>
            <Divider />
            <Box alignItems="center">
              <MaterialCommunityIcons name="coolant-temperature" size={24} color="orange" />
              <Text fontSize="md" mt={2}>{motorcycle.refrigeracao}</Text>
            </Box>
            <Divider />
          </VStack>
        </HStack>

        {/* Botão de Ação */}
        <Center mb={5} mt={5}>
          <Button
            colorScheme="primary"
            borderRadius={20}
            px={10}
            py={3}
            _text={{ fontWeight: 700, fontSize: 18 }}
            onPress={() => setCalendarVisible(true)}
          >
            Selecionar datas
          </Button>
        </Center>
      </Box>

      {calendarVisible && (
        <Modal isOpen={calendarVisible} onClose={() => setCalendarVisible(false)}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Selecione as datas</Modal.Header>
            <Modal.Body>
              <Calendar
                onDayPress={handleDayPress}
                markedDates={selectedDates}
              />
            </Modal.Body>
          </Modal.Content>
          <Modal.Footer mt={5} borderWidth={1} p={1} borderColor={"gray.500"}>
            {datesSelected && (
              <Button
                size={"lg"}
                onPress={() => {
                  setCalendarVisible(false); // Fechar o modal do calendário
                  setCheckoutModalVisible(true); // Abrir o modal de checkout
                }}
              >
                Confirmar
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      )}

      {checkoutModalVisible && (
        <Modal isOpen={checkoutModalVisible} onClose={() => setCheckoutModalVisible(false)}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Resumo da reserva</Modal.Header>
            <Modal.Body>
              <Text>Confirme as datas da reserva:</Text>
              <Text>{formatSelectedDates()}</Text>
              <Text>Valor total: R$ {calculateTotalPrice()}</Text>
              <Button
                colorScheme="primary"
                borderRadius={20}
                px={10}
                py={3}
                _text={{ fontWeight: 700, fontSize: 18 }}
                onPress={processPayment}
                mt={5}
              >
                Confirmar e Pagar
              </Button>
              {processingPayment && (
                <Center mt={5}>
                  <Spinner size="lg" />
                  <Text mt={3}>Processando pagamento...</Text>
                </Center>
              )}
            </Modal.Body>
          </Modal.Content>
        </Modal>
      )}

      {successModalVisible && (
        <Modal isOpen={successModalVisible} onClose={() => setSuccessModalVisible(false)}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Sucesso!</Modal.Header>
            <Modal.Body>
              <Center>
                <FontAwesome5 name="check-circle" size={80} color="green" />
                <Text mt={3} fontSize="lg" fontWeight="bold" color="green.500">
                  A motocicleta foi alugada com sucesso!
                </Text>
              </Center>
            </Modal.Body>
            <Modal.Footer>
              <Button
                colorScheme="green"
                onPress={() => setSuccessModalVisible(false)}
              >
                Fechar
              </Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      )}

    </NativeBaseProvider>
  );
};

export default MotorcycleDetails;

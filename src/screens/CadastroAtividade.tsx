import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAtividades } from '../context/AtividadesContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';

type Props = NativeStackScreenProps<RootStackParamList, 'CadastroAtividade'>;

export default function CadastroAtividade({ navigation, route }: Props) {
  const { adicionarAtividade, editarAtividade, atividades } = useAtividades();
  const { id } = route.params || {};

  const [nome, setNome] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [data, setData] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [descricao, setDescricao] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (id) {
      const atividade = atividades.find((atividade) => atividade.id === id);
      if (atividade) {
        setNome(atividade.nome);
        setResponsavel(atividade.responsavel);
        setData(new Date(atividade.data));
        setDescricao(atividade.descricao);
      }
    }
  }, [id, atividades]);

  const handleSalvar = async () => {
    if (!nome || !responsavel || !data || !descricao) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    const atividade = {
      id: id || Date.now(),
      nome,
      responsavel,
      data: data.toISOString(),
      descricao,
    };

    const dataHora = new Date(data);
    dataHora.setHours(hora.getHours());
    dataHora.setMinutes(hora.getMinutes());

    if (dataHora.getTime() <= new Date().getTime()) {
      Alert.alert('Erro', 'A data e hora da atividade devem estar no futuro!');
      return;
    }

    if (id) {
      editarAtividade(atividade);
      Alert.alert('Sucesso', 'Atividade editada com sucesso!');
    } else {
      adicionarAtividade(atividade);
      Alert.alert('Sucesso', 'Atividade cadastrada com sucesso!');

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Lembrete de Atividade",
          body: `Não se esqueça da atividade: ${nome}`,
        },
        trigger: {
          type: "date",
          date: dataHora,
        },
      });

      console.log('Notificação agendada com ID:', notificationId);  // Verifica o ID da notificação agendada
    }

    navigation.goBack();
  };

  const formatDateForDisplay = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatTimeForDisplay = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const showTimePickerModal = () => {
    setShowTimePicker(true);
  };

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setData(selectedDate);
    }
  };

  const onTimeChange = (event: any, selectedTime: Date | undefined) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      setHora(selectedTime);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome da Atividade:</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text style={styles.label}>Responsável:</Text>
      <TextInput style={styles.input} value={responsavel} onChangeText={setResponsavel} />

      <Text style={styles.label}>Data:</Text>
      <TouchableOpacity onPress={showDatePickerModal} style={styles.input}>
        <Text>{formatDateForDisplay(data)}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={data}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <Text style={styles.label}>Hora:</Text>
      <TouchableOpacity onPress={showTimePickerModal} style={styles.input}>
        <Text>{formatTimeForDisplay(hora)}</Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={hora}
          mode="time"
          display="default"
          onChange={onTimeChange}
        />
      )}

      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <View style={styles.buttonContainer}>
        <Button
          title={id ? "Salvar Alterações" : "Salvar Atividade"}
          onPress={handleSalvar}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  input: { borderWidth: 1, padding: 10, marginTop: 5, borderRadius: 5 },
  descriptionInput: { height: 120, textAlignVertical: 'top' },
  buttonContainer: { marginTop: 20 },
});

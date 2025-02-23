import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAtividades } from '../context/AtividadesContext';
import DateTimePicker from '@react-native-community/datetimepicker';

type Props = NativeStackScreenProps<RootStackParamList, 'CadastroAtividade'>;

export default function CadastroAtividade({ navigation, route }: Props) {
  const { adicionarAtividade, editarAtividade, atividades } = useAtividades();
  const { id } = route.params || {}; // Recebe o id da atividade, caso haja

  const [nome, setNome] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [data, setData] = useState(new Date()); // Usa Date para o estado
  const [descricao, setDescricao] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false); // Controla a visibilidade do date picker

  // Efeito para carregar os dados da atividade quando o id for passado
  useEffect(() => {
    if (id) {
      const atividade = atividades.find((atividade) => atividade.id === id);
      if (atividade) {
        setNome(atividade.nome);
        setResponsavel(atividade.responsavel);
        setData(new Date(atividade.data)); // Converte a data para um objeto Date
        setDescricao(atividade.descricao);
      }
    }
  }, [id, atividades]);

  const handleSalvar = () => {
    if (!nome || !responsavel || !data || !descricao) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    const atividade = {
      id: id || Date.now(),
      nome,
      responsavel,
      data: data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).split('/').join('-'), // Formata a data como DD-MM-YYYY
      descricao,
    };

    if (id) {
      editarAtividade(atividade); // Edita a atividade se o id for fornecido
      Alert.alert('Sucesso', 'Atividade editada com sucesso!');
    } else {
      adicionarAtividade(atividade); // Adiciona uma nova atividade
      Alert.alert('Sucesso', 'Atividade cadastrada com sucesso!');
    }

    navigation.goBack();
  };

  // Função para formatar a data exibida no TextInput
  const formatDateForDisplay = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setData(selectedDate);
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
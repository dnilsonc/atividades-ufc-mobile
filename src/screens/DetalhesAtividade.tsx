import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAtividades } from '../context/AtividadesContext';

type Props = NativeStackScreenProps<RootStackParamList, 'DetalhesAtividade'>;

export default function DetalhesAtividade({ route, navigation }: Props) {
  const { id } = route.params;
  const { atividades, editarAtividade, removerAtividade } = useAtividades();
  
  const [atividade, setAtividade] = useState<any>(null);

  useEffect(() => {
    const atividadeEncontrada = atividades.find((atividade) => atividade.id === id);
    if (atividadeEncontrada) {
      setAtividade(atividadeEncontrada);
    }
  }, [id, atividades]);

  const handleEditar = () => {
    if (!atividade) return;
    
    navigation.navigate('CadastroAtividade', { id: atividade.id });
  };

  const handleRemover = () => {
    if (!atividade) return;

    Alert.alert(
      'Remover Atividade',
      'Tem certeza que deseja remover esta atividade?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            removerAtividade(atividade.id);
            Alert.alert('Sucesso', 'Atividade removida com sucesso!');
            navigation.goBack();
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Função para formatar a data
  const formatDateForDisplay = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // Função para formatar a hora
  const formatTimeForDisplay = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      {atividade ? (
        <>
          <Text style={styles.label}>Nome da Atividade:</Text>
          <Text style={styles.text}>{atividade.nome}</Text>

          <Text style={styles.label}>Responsável:</Text>
          <Text style={styles.text}>{atividade.responsavel}</Text>

          {/* Exibindo a data e hora na mesma linha */}
          <Text style={styles.label}>Data e Hora:</Text>
          <Text style={styles.text}>
            {formatDateForDisplay(new Date(atividade.data))} - {formatTimeForDisplay(new Date(atividade.data))}
          </Text>

          <Text style={styles.label}>Descrição:</Text>
          <Text style={styles.text}>{atividade.descricao}</Text>

          <View style={styles.buttonContainer}>
            <Button title="Editar Atividade" onPress={handleEditar} />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Remover Atividade" onPress={handleRemover} color="red" />
          </View>
        </>
      ) : (
        <Text>Atividade não encontrada</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginTop: 10, 
    color: '#333'
  },
  text: { 
    fontSize: 16, 
    color: '#555', 
    marginBottom: 10
  },
  buttonContainer: { marginTop: 20 },
});
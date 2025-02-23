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

  return (
    <View style={styles.container}>
      {atividade ? (
        <>
          <Text style={styles.label}>Nome da Atividade: {atividade.nome}</Text>
          <Text style={styles.label}>Responsável: {atividade.responsavel}</Text>
          <Text style={styles.label}>Data: {atividade.data}</Text>
          <Text style={styles.label}>Descrição: {atividade.descricao}</Text>

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
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  buttonContainer: { marginTop: 20 },
});
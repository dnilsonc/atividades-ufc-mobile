import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useAtividades } from '../context/AtividadesContext';

type Props = NativeStackScreenProps<RootStackParamList, 'ListaAtividades'>;

const ListaAtividades: React.FC<Props> = ({ navigation }) => {
  const { atividades } = useAtividades();
  const [search, setSearch] = useState('');

  // Filtra as atividades pelo nome (ignorando maiúsculas/minúsculas)
  const filteredAtividades = atividades.filter((atividade) =>
    atividade.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Button
        title="Cadastrar Nova Atividade"
        onPress={() => navigation.navigate('CadastroAtividade')}
      />
      
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar por nome da atividade..."
        value={search}
        onChangeText={setSearch}
      />

      {filteredAtividades.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma atividade encontrada.</Text>
      ) : (
        <FlatList
          data={filteredAtividades}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('DetalhesAtividade', { id: item.id })}
            >
              <Text style={styles.nome}>{item.nome}</Text>
              <Text>{item.data} - {item.responsavel}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  searchInput: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  emptyText: { textAlign: 'center', fontSize: 16, marginTop: 20, color: '#999' },
  card: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    marginVertical: 8,
    borderRadius: 5,
    elevation: 2,
  },
  nome: { fontSize: 18, fontWeight: 'bold' },
});

export default ListaAtividades;

// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../types';
// import { useAtividades } from '../context/AtividadesContext';

// type Props = NativeStackScreenProps<RootStackParamList, 'CadastroAtividade'>;

// export default function EditarAtividade({ route, navigation }: Props) {
//   const { atividades, setAtividades } = useAtividades();
//   const { id } = route.params;
  
//   const [nome, setNome] = useState('');
//   const [responsavel, setResponsavel] = useState('');
//   const [data, setData] = useState('');
//   const [descricao, setDescricao] = useState('');

//   useEffect(() => {
//     // Carregar a atividade que será editada
//     const atividade = atividades.find((a) => a.id === id);
//     if (atividade) {
//       setNome(atividade.nome);
//       setResponsavel(atividade.responsavel);
//       setData(atividade.data);
//       setDescricao(atividade.descricao);
//     }
//   }, [id, atividades]);

//   const handleSave = () => {
//     const updatedAtividades = atividades.map((a) =>
//       a.id === id ? { ...a, nome, responsavel, data, descricao } : a
//     );
//     setAtividades(updatedAtividades);
//     navigation.goBack();
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Editar Atividade</Text>
      
//       <TextInput
//         style={styles.input}
//         placeholder="Nome"
//         value={nome}
//         onChangeText={setNome}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Responsável"
//         value={responsavel}
//         onChangeText={setResponsavel}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Data"
//         value={data}
//         onChangeText={setData}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Descrição"
//         value={descricao}
//         onChangeText={setDescricao}
//       />
      
//       <Button title="Salvar" onPress={handleSave} />
//       <Button title="Voltar" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff' },
//   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
//   input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 10, paddingLeft: 10 },
// });

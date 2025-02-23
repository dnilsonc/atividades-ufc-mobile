export type RootStackParamList = {
  ListaAtividades: undefined;
  CadastroAtividade: { id: number } | undefined;  // Agora permite um parâmetro 'id'
  DetalhesAtividade: { id: number };
};

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ListaAtividades from './screens/ListaAtividades';
import CadastroAtividade from './screens/CadastroAtividade';
import DetalhesAtividade from './screens/DetalhesAtividade';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListaAtividades">
        <Stack.Screen name="ListaAtividades" component={ListaAtividades} options={{ title: 'Atividades' }} />
        <Stack.Screen name="CadastroAtividade" component={CadastroAtividade} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="DetalhesAtividade" component={DetalhesAtividade} options={{ title: 'Detalhes' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
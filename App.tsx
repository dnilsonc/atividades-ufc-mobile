import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaAtividades from './src/screens/ListaAtividades';
import CadastroAtividade from './src/screens/CadastroAtividade';
import DetalhesAtividade from './src/screens/DetalhesAtividade';
import { RootStackParamList } from './src/types';
import { AtividadesProvider } from './src/context/AtividadesContext';
import * as Notifications from 'expo-notifications';

const Stack = createNativeStackNavigator<RootStackParamList>();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission for notifications not granted');
      } else {
        console.log('Notification permissions granted');
      }
    };

    getPermissions();
  }, []);

  return (
    <AtividadesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ListaAtividades" component={ListaAtividades} options={{ title: 'Atividades' }} />
          <Stack.Screen name="CadastroAtividade" component={CadastroAtividade} options={{ title: 'Cadastrar Atividade' }} />
          <Stack.Screen name="DetalhesAtividade" component={DetalhesAtividade} options={{ title: 'Detalhes' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AtividadesProvider>
  );
}

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import ListaAtividades from './src/screens/ListaAtividades';
// import CadastroAtividade from './src/screens/CadastroAtividade';
// import DetalhesAtividade from './src/screens/DetalhesAtividade';
// import { RootStackParamList } from './src/types';

// const Stack = createNativeStackNavigator<RootStackParamList>();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="ListaAtividades" component={ListaAtividades} options={{ title: 'Atividades' }} />
//         <Stack.Screen name="CadastroAtividade" component={CadastroAtividade} options={{ title: 'Cadastrar Atividade' }} />
//         <Stack.Screen name="DetalhesAtividade" component={DetalhesAtividade} options={{ title: 'Detalhes' }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import Navigation from './src/navigation';

// export default function App() {
//   return <Navigation />;
// }

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import ListaAtividades from './src/screens/ListaAtividades';
// import CadastroAtividade from './src/screens/CadastroAtividade';
// import DetalhesAtividade from './src/screens/DetalhesAtividade';
// import { RootStackParamList } from './src/types';
// import { AtividadesProvider } from './src/context/AtividadesContext';

// const Stack = createNativeStackNavigator<RootStackParamList>();

// export default function App() {
//   return (
//     <AtividadesProvider>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="ListaAtividades" component={ListaAtividades} options={{ title: 'Atividades' }} />
//           <Stack.Screen name="CadastroAtividade" component={CadastroAtividade} options={{ title: 'Cadastrar Atividade' }} />
//           <Stack.Screen name="DetalhesAtividade" component={DetalhesAtividade} options={{ title: 'Detalhes' }} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </AtividadesProvider>
//   );
// }

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaAtividades from './src/screens/ListaAtividades';
import CadastroAtividade from './src/screens/CadastroAtividade';
import DetalhesAtividade from './src/screens/DetalhesAtividade';
import { RootStackParamList } from './src/types';
import { AtividadesProvider } from './src/context/AtividadesContext';  // Importe o AtividadesProvider

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
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

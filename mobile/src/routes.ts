import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';

const AppNavigator = createStackNavigator(
  {
    Main,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#00838f',
      },
      headerTintColor: '#FFF',
    },
  }
);

const Routes = createAppContainer(AppNavigator);

export default Routes;

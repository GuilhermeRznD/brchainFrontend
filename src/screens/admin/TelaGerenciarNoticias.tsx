import React from 'react';
import { View, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import AdminHeader from '../../components/AdminHeader';
import MenuListItem from '../../components/MenuListItem';
import { styles } from '../styles/telaGerenciarNoticiasStyles';

type Props = {
  navigation: StackNavigationProp<any>;
};

const TelaGerenciarNoticias: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* 3. O CABEÇALHO BRANCO */}
      <AdminHeader
        title="Gerenciar Notícias"
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        onMenuPress={() => console.log('Abrir menu lateral')}
      />

      <ScrollView>
        <MenuListItem
          text="Notícias Publicadas"
          onPress={() => navigation.navigate('TelaGerenciarNoticiasADM')}
        />
        <MenuListItem
          text="Ver Notícias"
          onPress={() => console.log('Ir para Ver Notícias')}
        />
        <MenuListItem
          text="Ver Relatórios"
          onPress={() => console.log('Ir para Ver Relatórios')}
        />
      </ScrollView>
    </View>
  );
};

export default TelaGerenciarNoticias;
// import React, {useState, useEffect} from 'react';
// import {
//   Text,
//   SafeAreaView,
//   View,
//   Image,
//   TextInput,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import HeaderBack from '../components/locations/HeaderBack';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import TextInputJS from '../components/locations/TextInputJS';
// import TextInputLong from '../components/locations/TextInputLong';
// import ModalAddMember from '../components/CreateTeam/ModalAddMember';

// const CreateTeamScreen = ({navigation, route}) => {
//   const {dataUser} = route.params;
//   return (
//     <SafeAreaView style={{backgroundColor: '#0AB134', flex: 1}}>
//       <ModalAddMember visible={true} />
//       <HeaderBack
//         backBtn
//         title="Tạo đội bóng"
//         goBack={() => navigation.goBack()}
//       />
//       <View style={{backgroundColor: 'white', flex: 1}}>
//         <ScrollView>
//           <View>
//             <Image
//               source={require('../assets/images/sanco.jpg')}
//               style={{width: 414, height: 180}}
//               resizeMode="cover"
//             />
//             <Image
//               source={{
//                 uri:
//                   'https://cdnmedia.webthethao.vn/uploads/files/17-6/Logo/mu.png',
//               }}
//               style={{
//                 width: 110,
//                 height: 110,
//                 borderRadius: 90,
//                 position: 'absolute',
//                 top: 118,
//                 marginHorizontal: 150,
//               }}
//             />
//             <View
//               style={{
//                 width: 25,
//                 height: 25,
//                 borderRadius: 25,
//                 backgroundColor: '#676767',
//                 position: 'absolute',
//                 top: 210,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 marginHorizontal: 220,
//               }}>
//               <MaterialIcons name="edit" size={15} color="white" />
//             </View>
//           </View>
//           <View>
//             <TextInputJS title="Tên đội" value="" />
//             <TextInputLong title="Khu vực thi đấu" value="" />
//           </View>
//           <View
//             style={{
//               flex: 1,
//               backgroundColor: 'white',
//               paddingHorizontal: 17,
//             }}>
//             <Text style={{fontSize: 15}}>Thêm thành viên</Text>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//               }}>
//               <TouchableOpacity>
//                 <AntDesign
//                   name="pluscircleo"
//                   size={40}
//                   color="#0AB134"
//                   style={{paddingVertical: 20}}
//                 />
//               </TouchableOpacity>
//               <View style={{alignItems: 'center'}}>
//                 <Image
//                   source={{
//                     uri: dataUser.avatar ? dataUser.avatar : null,
//                   }}
//                   style={{
//                     width: 55,
//                     height: 55,
//                     marginHorizontal: 40,
//                     borderRadius: 55,
//                     marginTop: 15,
//                     marginBottom: 5,
//                   }}
//                 />
//                 <Text style={{fontSize: 15}}>Huỳnh Bình</Text>
//               </View>
//             </View>
//             <TouchableOpacity
//               style={{
//                 marginVertical: 60,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 width: 380,
//                 height: 50,
//                 backgroundColor: '#0AB134',
//                 borderRadius: 7,
//               }}>
//               <Text style={{fontSize: 16, color: 'white'}}>TẠO ĐỘI</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default CreateTeamScreen;

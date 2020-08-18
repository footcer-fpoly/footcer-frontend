import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        // paddingTop: 100
        // justifyContent: 'space-between'
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    logo: {
        width: 120,
        height: 120,
    },
    footer: {
        backgroundColor: '#fff',
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        paddingHorizontal: 30,
        paddingBottom: 10,
        paddingTop: 30,
        alignItems: 'center',
    },
    action: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#95a5a6',
        width: 350,
        alignItems: 'center',
        paddingLeft: 10,
        height: 50,
        borderRadius: 5,
        // backgroundColor: '#ecf0f1'
    },
    input: {
        // backgroundColor: 'red',
        // width: 350,
        // paddingVertical: 10,
        // borderRadius: 5,
        // fontSize: 20,
        textAlign: 'center',
        // paddingHorizontal: 20,
        // color: '#676767',
        // borderWidth: 0.5
        flex: 1,
        paddingLeft: 10,
        color: '#57606f',
        fontSize: 20,
    },
    btnNext: {
        backgroundColor: '#27ae60',
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    warpperResendAndChange: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    txtResendAndChange: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    }

});
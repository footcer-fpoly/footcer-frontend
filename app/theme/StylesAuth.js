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
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingHorizontal: 30,
        paddingBottom: 10,
        paddingTop: 30,
        alignItems: 'center',
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
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
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        backgroundColor: '#fff',
        fontSize: 16
    },
    input: {
        textAlign: 'center',
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
    more: {
        width: '100%',
        marginTop: 10,
        alignItems: 'center'
    },

    txtMore: {
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#676767',
        fontWeight: 'bold',
        borderRadius: 10,
    },
    warpperResendAndChange: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    inputOTP: {
        textAlign: 'center',
        fontSize: 30,
        margin: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        color: '#16a085',
        width: 35,
        backgroundColor: '#ecf0f1',
        paddingVertical: 5,
        height: 50,
        borderRadius: 5
    },
    warpperFooter: {
        backgroundColor: 'white',
    },
    warpperInputOTP: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    ////// SignUpPhone
    btnGoBack: {
        position: 'absolute',
        top: 20,
        left: 15
    },
    titleScreen: {
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 20,
        fontSize: 25
    },
    subTitleScreen: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18
    },
    footerSignUp: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    actionSignUp: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    button: {
        marginBottom: 20,
        marginTop: 40,
        paddingHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: '#2ecc71',
        borderRadius: 5,
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButton: {
        flex: 1,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18
    }
});
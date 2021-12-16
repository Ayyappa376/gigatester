import React, { useState } from 'react';
import { StyleSheet, View, Modal, Text, TextInput, Button } from 'react-native';
import { CheckBox } from 'react-native-elements'
import {Entypo} from '@expo/vector-icons';
import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'https://wznjlettbb.execute-api.us-east-1.amazonaws.com/qa/GT_AppFeedback/',
    timeout: 1000,
    proxy:{
        host: 'https://localhost',
        port: 8080
    }, 
    headers: {
        'origin': 'https://localhost:19006',
        'referer': 'https://localhost:19006/',
        'content-type': 'application/json'
    }  
});
interface IProps  {
    show: boolean,
    closeModal: Function,
}

const feedbackTemplates = ["There was something wrong with the interface.", "The screen went blank in the middle", "The app went non-responsive for sometime.", "The app is laggy."]

const MINIMUM_POSITIVE_RATING = 3;

const postData = async() => {
    const body = {
        "body": {
            "data": {
                "id": "1632",
                "userId": "1236",
                "feedbackScore": 5,
                "productVersion": "1",
                "feedbackComments": ["abn", "fgh"],
                "productId": "prod_002530f0-4da6-11ec-bda2-8186c737d04e",
                "productName": "sling"
            }
        }
    }
    httpRequest.post('', JSON.stringify(body)).then((response) => {console.log({response})}).catch((e) => {console.log({e})})
}

const Feedback = (props: IProps) => {

    const [rating, setRating] = useState(0);
    const [feedbackText, setFeedbackText] = useState<Array<String>>([]);
    const [askDetailedFeedback, setAskDetailedFeedback] = useState(false);
    const [additionalComments, setAdditionalComments] = useState("");

    const resetState = () => {
        setRating(0);
        setFeedbackText([]);
        setAskDetailedFeedback(false);
        setAdditionalComments("")
    }

    const StarRow = () => {
        return(
            <View style={{display: 'flex', flexDirection: 'row'}}>
                {[1,2,3,4,5].map((el, i) => {
                    return (
                        <View key={i}>
                            <Entypo 
                                name= {rating < (i + 1) ? "star-outlined" : "star"} 
                                size={24} 
                                color="#fff" 
                                onPress={() => { setRating(i+1);
                                  setTimeout(() => i + 1 < MINIMUM_POSITIVE_RATING ?
                                  setAskDetailedFeedback(true) : props.closeModal(), 2000)}}/>
                        </View>
                    )
                })}
            </View>
        )
    }

    const updateFeedbackText = (val: string) => {
        const feedbackTextCopy = [...feedbackText];
        feedbackTextCopy.push(val);
        setFeedbackText(feedbackTextCopy);
    }

    const DetailedFeedback = () => {
        return(
            <View style={styles.modalStyle}>
                <Text style={styles.headerText}>What went wrong?</Text>
                <View style={{...styles.alignItemsLeftProp, marginTop: 15}}>
                {feedbackTemplates.map((val, i) => {
                    return(
                        <View style={styles.checkboxText}>
                            <CheckBox
                                key={val}
                                disabled={false}
                                textStyle={{backgroundColor: '#252525', color:"#fff", fontWeight: "normal"}}
                                containerStyle={{backgroundColor: '#252525', borderColor: 'transparent'}}
                                title={val}
                                checked={feedbackText.length > 0 && feedbackText.includes(val)}
                                onPress={() => {updateFeedbackText(val)}}
                            />
                        </View>
                    )
                })}
                <TextInput
                    style={styles.textInput}
                    placeholder="Additional Comments"
                    onChangeText={text => setAdditionalComments(text)}
                    
                    value={additionalComments}
                />
                </View>
                <View style={{display: 'flex', flexDirection: 'row', marginTop: 15}}>
                    <View style={{padding: 10, minWidth: '50%'}}>
                        <Button onPress={() => {props.closeModal(); resetState()}}
                            title="Skip"
                            color="#007ACC"
                            accessibilityLabel="Skip"
                        />
                    </View>
                    <View style={{padding: 10, minWidth: '50%'}}>
                        <Button onPress={() => {updateFeedbackText(additionalComments);
                                                postData();
                                                props.closeModal()}}
                            title="Submit"
                            color="#007ACC"
                            accessibilityLabel="Submit"
                        />
                    </View>
                </View>
            </View>
        )
    }

    const StarFeedback = () => {
        return (
            <View style={styles.modalStyle}>
                <Text style={styles.headerText}>Please Rate Your Experience!</Text>
                <View style={{minHeight: 20}}></View>
                <StarRow/>
            </View>
        )
    }
    
    return (
        <View>
            <Modal visible={props.show}
                animationType="slide"
                transparent={true}>
                {askDetailedFeedback ? <DetailedFeedback/> : <StarFeedback/>}
            </Modal>
        </View>
    )

}

const styles = StyleSheet.create({
    modalStyle: {
        margin: 11,
        marginTop: 'auto',
        color: 'white',
        backgroundColor: '#252525',
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        textAlign: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    alignItemsCenterProp: {
        alignItems: "center",
    },
    alignItemsLeftProp: {
        alignItems: "flex-start",
    },
    headerText: {
        color: "#fff",
        fontSize: 23,
        fontWeight: "bold",
    },
    textInput: {
        marginTop: 10,
        height: 40,
        borderWidth: 1,
        borderColor: "#444444",
        borderRadius: 5,
        minWidth: "95%",
        padding: 10,
        color: '#fff'
    },
    checkboxText: {
        textAlign: "left"
    }
})

export default Feedback;
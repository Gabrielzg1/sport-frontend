import React, { useState, useEffect } from "react";
import {
	ScrollView,
	Alert,
	Button,
	View,
	Text,
	FlatList,
	TouchableOpacity,
	Modal,
	StyleSheet,
	SafeAreaView,
	StatusBar,
	Platform,
	TouchableNativeFeedback,
	TextInput, 
} from "react-native";
import axios from "axios";

export default function Head2HeadScreen({}){
    

    const [modalVisible, setModalVisible] = useState(false);
	const [modalVisible2, setModalVisible2] = useState(false);

	const [listPlayer, setListPlayer] = useState(null);

    const [player1name, setPlayer1Name] = useState("");
    const [player1gols, setplayer1gols] = useState("");
    const [player1assists, setPlayer1assists] = useState("");

	const [player2name, setPlayer2Name] = useState("");
    const [player2gols, setplayer2gols] = useState("");
    const [player2assists, setPlayer2assists] = useState("");

	const [select,setSelect] =  useState("");




	const loadPlayers = async () => {
		try {
		  const response = await axios.get(`http://10.0.2.2:2020/players`);
		  setListPlayer(response.data);
		} catch (error) {
		  console.log(error);
		  Alert.alert("Error", "Could not load players data.");
		}
	  };



	useEffect(() => {
		loadPlayers();
	}, []);

	const handlePressTouchable = (player) => {

		setModalVisible(false)

		if (select==="1"){
			setPlayer1Name(player.name)
			setplayer1gols(player.goals)
			setPlayer1assists(player.assists)
		}
		else if(select==="2"){
			setPlayer2Name(player.name)
			setplayer2gols(player.goals)
			setPlayer2assists(player.assists)
		}
	}
	

	const renderItem = ({ item }) => (

		<TouchableOpacity style={styles.containertouchable} onPress={handlePressTouchable(item)}>
			<View style={styles.listItem}>
				<Text style={styles.textlist}>{item.name}</Text>
			</View>
		</TouchableOpacity>

	);


return(
    <SafeAreaView style={styles.safecontainer}>

		<Text style={{fontSize:23, alignSelf:"center"}}>Head2Head</Text>


		<Text>Selecione o Primeiro Jogador</Text>

        <TouchableOpacity 
			style={styles.firstselect}
			onPress={()=> {setModalVisible(true), setSelect("1")}}>
			<Text>{player1name}</Text>
			<Icon name={"chevron-down"}/>
        </TouchableOpacity>


		<Text>Selecione o Segundo Jogador</Text>

		<TouchableOpacity style={styles.firstselect}
			onPress={()=> {setModalVisible(true), setSelect("2")}}
		>
			<Text>{player2name}</Text>
			<Icon name={"chevron-down"}/>
        </TouchableOpacity>


		<Modal
			animationType="fade"
			visible={modalVisible}
			transparent={false}
			onRequestClose={() => setModalVisible(false)}
		>

			<SafeAreaView>
				<View styles={styles.viewheadermodel}>

					<Text>Lista Jogadores</Text>
					<TouchableOpacity onPress={() => {setModalVisible(false)}}>
						<Text  style={styles.modalCloseButton}>×</Text>
					</TouchableOpacity>
				</View>
				
				<FlatList
					data={listPlayer}
					renderItem={renderItem}
					keyExtractor={(item) => item.id.toString()}
					ItemSeparatorComponent={() => <View style={styles.separator1} />}
				/>
			</SafeAreaView>
		</Modal>
		
		<Button
		
			title="Compare"
			style={styles.buttonehead2head}
			onPress={setModalVisible2(true)}		
		/>

		<Modal
			animationType="fade"
			visible={modalVisible2}
			transparent={false}
			onRequestClose={() => setModalVisible2(false)}
		>
			<SafeAreaView>

				<TouchableOpacity onPress={() => {setModalVisible2(false)}}>
					<Text  style={styles.modalCloseButton}>×</Text>
				</TouchableOpacity>	


					<Text style={{alignSelf:"center", fontSize:20, fontWeight:200}}>Estatisticas</Text>
				<View style={styles.viewnameplayers}>
					<Text style={styles.nameplayers}>{player1name}</Text>
					<Text style={styles.nameplayers}>{player2name}</Text>
				</View>


					<Text style={styles.titulo}>Goals</Text>
				<View style={viewgoals}>
					<Text>{player1gols}</Text>
					<Text>{player2gols}</Text>
				</View>


					<Text style={styles.titulo}>Assists</Text>
				<View style={viewassists}>
					<Text>{player1assists}</Text>
					<Text>{player2assists}</Text>
				</View>

			</SafeAreaView>
		</Modal>
    </SafeAreaView>
)}



const styles = StyleSheet.create({

    safecontainer: {

		padding:20,
	
    },

	viewnameplayers:{

		padding:10,
		flex:1,
		flexDirection:'row',
		justifyContent: "center",


	},

	viewgoals:{

		padding:10,
		flex:1,
		flexDirection:'row',
		justifyContent: "center",
		fontSize: 16,



	},

	viewassists:{

		padding:10,
		flex:1,
		flexDirection:'row',
		justifyContent: "center",
		fontSize: 16,

	},


	titulo:{

		fontSize: 16,
		padding:18,
		justifyContent: "center",
		alignItems:"center",
	},

	nameplayers: {

		fontSize: 19,
	},

	containertouchable:{

		flexDirection:'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	listItem:{

		backgroundColor: "#ffffff",
		paddingVertical: 15,
		paddingHorizontal: 20,
		justifyContent: "center",
	},

	textlist:{

		fontSize: 18,
		fontWeight: 300,
	},

	viewheadermodel:{
		flexDirection:'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		fontSize:16,
		padding:10,

	},




	buttonehead2head:{
		margin: 10,
		color:"#1E90FF",
	},


	firstselect: {

		fontSize: 17,
		height: 40,
		borderWidth: 1,
		paddingLeft: 20,
		margin: 10,
		borderColor: "#009688",
		backgroundColor: "white",
		flexDirection:'row',
		justifyContent: 'space-between',
		alignItems: 'center',

	},

	separator1: {
		height: 1,
		backgroundColor: "#e1e1e1",
	},

	modalCloseButton: {
		alignSelf: "flex-end",
		padding: 8,
		borderRadius: 15,
		backgroundColor: "#e0e0e0",
	},



})
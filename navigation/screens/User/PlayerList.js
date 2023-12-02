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

const PlayerList = ({ players }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedPlayer, setSelectedPlayer] = useState(null);
	const [searchTerm, setSearchTerm] = useState(null); 
	const [filteredPlayers, setFilteredPlayers] = useState(players); 
	const [suggestion, setSuggestion] = useState("");
    const [playername, setPlayerName] = useState("");
	const [isTableVisible, setIsTableVisible] = useState(false);

	const handlePlayerPress = (player) => {
		setSelectedPlayer(player);
		setModalVisible(true);
		setPlayerName(player.name);
	};

	useEffect(() => {
		setFilteredPlayers(players);
	}, [players]);

	const handleSearch = (text) => {
		setSearchTerm(text);
		if (text) {
			const newData = players.filter((item) => {
				const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
				const textData = text.toUpperCase();
				return itemData.indexOf(textData) > -1;
			});
			setFilteredPlayers(newData);
		} else {
			setFilteredPlayers(players);
		}
	};

	const handleSubmitsuggestion = async () => {
		try {
		const response = await axios.post(`http://10.0.2.2:2020/suggestions`, {
			playername, suggestion
		});
		Alert.alert(
			"Suggestion Submitted",
			"Your suggestion has been submitted succesfully!"
		);
		setSuggestion("");
		} catch (error) {
		console.log(error);
		Alert.alert("Error", "There was an error submitting your suggestion.");
		}
	};

	const ordenarPorGols = () => {
        const jogadoresOrdenados = [...players].sort((a, b) => b.goals - a.goals);
        setFilteredPlayers(jogadoresOrdenados);
        setIsTableVisible(true);
    };

	const ocultarTabela = () => {
		setIsTableVisible(false);
	};

	const TabelaJogadores = () => (
		<ScrollView style={styles.scrollView}>
        <View style={styles.tabelaContainer}>
            <Text style={styles.tabelaHeader}>Jogadores</Text>
            {filteredPlayers.map((jogador) => (
                <View key={jogador.id} style={styles.tabelaRow}>
                    <Text style={styles.tabelaCell}>{jogador.name}</Text>
                    <Text style={styles.tabelaCell}>{jogador.goals}</Text>
                </View>
            ))}
        </View>
		</ScrollView>
    );

	const Touchable = Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

	const renderItem = ({ item }) => (
		<Touchable onPress={() => handlePlayerPress(item)}>
			<View style={styles.listItem}>
				<Text style={styles.playerName}>{item.name}</Text>
			</View>
		</Touchable>
	);

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />
			<TextInput
				style={styles.searchBar}
				value={searchTerm}
				placeholder="Search Players"
				onChangeText={(text) => handleSearch(text)}
			/>
			  <Button
                title={isTableVisible ? "Ocultar Tabela" : "Mostrar Tabela de Jogadores por Gols"}
                onPress={() => setIsTableVisible(!isTableVisible)}
            />
            {isTableVisible ? (
                <TabelaJogadores />
            ) : (
            <FlatList
                data={filteredPlayers}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
			)}
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalView}>
						<TouchableOpacity
							style={styles.modalCloseButton}
							onPress={() => {setModalVisible(!modalVisible), setSuggestion("")}}
						>
							<Text style={styles.modalCloseText}>×</Text>
						</TouchableOpacity>
						<View style={styles.modalContent}>
							<Text style={styles.modalName}>{selectedPlayer?.name}</Text>
							<Text style={styles.modalInfo}>
								Goals: {selectedPlayer?.goals}
							</Text>
							<Text style={styles.modalInfo}>
								Assists: {selectedPlayer?.assists}
							</Text>
							<Text style={styles.suggestionLabel}>Suggest data change:</Text>
							<TextInput
								style={styles.textsuggestion}
								value={suggestion}
								onChangeText={setSuggestion}
								placeholder="Write your suggestion here"
								multiline
							/>
							<Text></Text>
							<Button
							    style={styles.buttonsug}
								title="Submit suggestion"
								onPress={handleSubmitsuggestion}
								color="#1E90FF"
							/>
						</View>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	scrollView: {
		maxHeight: '100%',
	},
	tabelaContainer: {
        backgroundColor: "white",
        margin: 10,
        padding: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    tabelaHeader: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    tabelaRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    tabelaCell: {
        fontSize: 16,
    },
	buttonsug: {
		margin: 10,
	},
	textsuggestion: {
		borderWidth: 2,
		borderRadius: 5,
		padding: 8,
	},
	suggestionLabel: {
		fontSize: 18,
		padding: 10,
		alignSelf: "center",
	  },
	searchBar: {
		height: 40,
		borderWidth: 1,
		paddingLeft: 20,
		margin: 10,
		borderColor: "#009688",
		backgroundColor: "white",
	},
	container: {
		flex: 1,
		backgroundColor: "#f5f5f5",
	},
	listItem: {
		backgroundColor: "#ffffff",
		paddingVertical: 15,
		paddingHorizontal: 20,
		justifyContent: "center",
		elevation: 1,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
	},
	playerName: {
		fontSize: 16,
		fontWeight: "500",
		color: "#333",
	},
	separator: {
		height: 1,
		backgroundColor: "#e1e1e1",
	},
	modalOverlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.7)",
	},
	modalView: {
		width: "85%",
		backgroundColor: "white",
		borderRadius: 15,
		padding: 20,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	modalCloseButton: {
		alignSelf: "flex-end",
		padding: 8,
		borderRadius: 15,
		backgroundColor: "#e0e0e0",
	},
	modalCloseText: {
		fontSize: 18,
		color: "#333",
		fontWeight: "bold",
	},
	modalContent: {
		alignItems: "center",
	},
	modalName: {
		fontSize: 20,
		fontWeight: "bold",
		marginVertical: 10,
	},
	modalInfo: {
		fontSize: 16,
		marginTop: 5,
		color: "#555",
	},
	modalCloseButton: {
		alignSelf: "flex-start",
		marginBottom: 20,
	},
	modalCloseText: {
		fontSize: 24,
		color: "#333",
	},
	modalName: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 10,
	},
	modalInfo: {
		fontSize: 18,
		marginVertical: 2,
	},
});

export default PlayerList;

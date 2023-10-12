import { StatusBar } from 'expo-status-bar';
import { StyleSheet,
	 Text,
	 View,
	 Switch,
	 TextInput,
	 KeyboardAvoidingView,
	 Platform,
	 Keyboard,
	 TouchableWithoutFeedback,
	 TouchableOpacity,
	 ScrollView,
	 Alert
	 } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import  Todo  from  './component/todo';


export default function App() {	

	const textInputRef = useRef(null);

	useEffect(() => {
	// Automatically focus the TextInput when the component mounts
	textInputRef.current.focus();
	}, []);
	
	const [isEnabled, setIsEnabled] = useState(false);
	const [task, setTask] = useState();
	const [taskItems, setTaskItems] = useState([]);
	const[showing, setShowing] = useState(false);


	const handleTask = () => {
		if(task === null){
			return null;
		}else{
			// Keyboard.dismiss();
			setTaskItems([...taskItems, task]);
			setTask(null)
		}
	}
	
	const deleteTask = (index) => {
		let itemsCopy = [...taskItems];
		itemsCopy.splice(index, 1);
		setTaskItems(itemsCopy);
	}

	const toggle = () => {
		setIsEnabled(!isEnabled)

	}
	const bgcolor = () => {
		if (isEnabled == true){
			return { backgroundColor: "#000000" };
			}else{
			return { backgroundColor: "#ffffff" };
				}
	}

	const getStatusBarColor = () => {
		return isEnabled ? '#000000' : '#fff'; // Change the colors as per your design
	      }
	const themeColor = () => {
		return isEnabled ? '#141414' : '#fff'; // Change the colors as per your design
	      }

	      const Toggleshow = () => {
		      setShowing(!showing); // Toggle the state from true to false or vice versa
		      textInputRef.current.focus();
	      }
	      const removeShow = () => {
		setShowing(!showing); // Toggle the state from true to false or vice versa
		setTask(null)
	      }
	      

	      const show = () => {
		return showing ? { display: "flex" } : { display: "none" };
	      }

	      const hide = () => {
		if(showing){
			return {display:"none"}
		}else{
			Keyboard.dismiss()
			return {display:'flex'}
		}
		
	      }

	      



  return (
	//List
	<TouchableWithoutFeedback onPress={() => {
		Keyboard.dismiss()
	}}>
		<View style={[styles.container, bgcolor()]}>
		<View style={styles.wrapper}>
				<Text style={[styles.header, {color: isEnabled ? "#fff" : "#333"}]}>ToDo</Text>
				<TouchableOpacity style={[styles.theme,{backgroundColor: isEnabled ? "#7081cc" : "#333"}]} onPress={() => toggle()}></TouchableOpacity>
			
		</View>

		<ScrollView>
			{taskItems.map((item, index) => {
				return (
				<TouchableOpacity key={index} onPress={() => deleteTask(index)}>
					<Todo title={item}/>
				</TouchableOpacity>
				)
			})}
		</ScrollView>

		{/* where the input will go */}
		<KeyboardAvoidingView style={[styles.inputWrapper,  {backgroundColor: isEnabled ? "rgb(40, 41, 41)" : "rgb(194, 209, 238)"}]}
		behavior={Platform.OS === 'ios' ? "padding" : "height"}
		>

			<TouchableOpacity onPress={() => Toggleshow()} style={[{display: showing ? "none" : "flex" }, hide()]}>
				<View style={styles.adder}>
					<Text style={{color: "#fff",fontSize: 30,opacity:0.7, paddingHorizontal: 7}}>+</Text>
				</View>
			</TouchableOpacity>


			<TextInput style={[styles.input, show(), {backgroundColor: isEnabled ? "#333" : "#fff"},  {color: isEnabled ? "#fff" : "#333"}]} ref={textInputRef} placeholder='Create a list...'  value={task} placeholderTextColor="rgb(119, 119, 119)" onChangeText={(text) => setTask(text)} />
			<View style={[styles.btns, show()]}>
				<TouchableOpacity onPress={() =>removeShow() }>
					<View style={styles.canceler}>
						<Text style={{color: "#fff",fontSize: 15,opacity:0.7, paddingHorizontal: 7}}>cancel</Text>
					</View>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => handleTask()}>
					<View style={styles.addList}>
						<Text style={{color: "#fff",fontSize: 15,opacity:0.7, paddingHorizontal: 7}}>save</Text>
					</View>
				</TouchableOpacity>
			</View>

		</KeyboardAvoidingView>
		<StatusBar
			backgroundColor={getStatusBarColor()}
		/>
		</View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
	wrapper: {
		marginTop: 27,
		padding: 15,
		flexDirection: "row",
		justifyContent: "space-between"
	},
	header: {
		fontSize: 29,
		fontWeight: "bold",
		fontStyle: "normal",
		color: "#333",
	},
	inputWrapper: {
		position: "absolute",
		justifyContent: "space-around",
		flexDirection: "column",
		alignItems: "center",
		bottom: 0,
		width: "100%",
		padding: 5,
		paddingBottom: 15,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	input: {
		margin: 10,
		padding: 9,
		borderRadius: 15,
		fontSize:18,
		borderColor: "rgb(150, 178, 230)",
		width: "90%",
		display:"none"
	},
	adder: {
		height: 50,
		width: 50,
		alignItems: "center",
		justifyContent: "center",
		padding: 5,
		borderRadius: 30,
		backgroundColor: "rgb(130, 155, 206)",
		
	},
	addList: {
		position: "absolute",
		height: 30,
		width: 50,
		alignItems: "center",
		justifyContent: "center",
		left: 85,
		borderRadius: 30,
		backgroundColor: "rgb(130, 155, 206)"
	},
	// the cancel button
	canceler: {
		// position: "absolute",
		right: 135,
		height: 30,
		width: 57,
		paddingBottom: 2,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 30,
		backgroundColor: "rgb(130, 155, 206)",
		
	},
	// the backgroundColor of the app
	theme: {
		width: 25,
		height: 25,
		borderRadius: 15,
		marginTop:9,
	},
	// the cancel and the save icon
	btns: {
		flexDirection:"row",
		justifyContent: "space-between",
		display: "none"
	}
});

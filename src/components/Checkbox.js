import { Image, Pressable, StyleSheet, Text, View } from "react-native"; 
import React from "react"; 

const CheckBox = (props) => { 
	const iconName = props.isChecked ? 
		"checkbox-marked" : "checkbox-blank-outline"; 

	return ( 
		<View style={styles.container}> 
			<Pressable onPress={props.onPress}> 
            <Image style={styles.eye} source={props.isChecked ? require('../assets/check.png') : require('../assets/uncheck.png')} />
			</Pressable> 
			<Text style={styles.title}>{props.title}</Text> 
		</View> 
	); 
}; 

export default CheckBox; 

const styles = StyleSheet.create({ 
	container: { 
		justifyContent: "flex-start", 
		alignItems: "center", 
		flexDirection: "row", 
		// width: 150, 
		marginTop: 8, 
		marginHorizontal: 16, 
	}, 
	title: { 
		fontSize: 16, 
		color: "#000", 
		marginLeft: 8, 
		fontWeight: "600", 
	}, 
    eye:{
        width: 18,
        height: 18
    }
}); 

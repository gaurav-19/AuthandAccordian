import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { CONTENT } from '../data/content';
import CheckBox from '../components/Checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../utils/colors';
import Header from '../components/Header';

const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('my-data', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('my-data');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

function AccordionItem({ children, title, onPress, isChecked }){
  const [ expanded, setExpanded ] = useState(false);

  function toggleItem() {
    setExpanded(!expanded);
  }

  const body = <View style={styles.accordBody}>{ children }</View>;

  return (
    <View style={styles.accordContainer}>
        <View style={{flexDirection: 'row', padding: 8}}>
        <Pressable onPress={onPress} style={{ alignContent:'center', justifyContent:'center'}}> 
            <Image style={styles.eye} source={isChecked ? require('../assets/check.png') : require('../assets/uncheck.png')} />
        </Pressable> 
        <TouchableOpacity style={styles.accordHeader} onPress={ toggleItem }>
            <Text style={styles.accordTitle}>{ title }</Text>
        </TouchableOpacity>
        </View>
        { expanded && body }
    </View>
  );
}

function AccordianContent({item, onPress}){
    const setValue = (id) => {
        var count = 0;
        var updated = item.subcategory.map((sub, index) => {
          if(count >= 5){
            Alert.alert('5 checks already completed')
          }
          if(sub.id === id && !(count >= 5)){
              sub.isSelected = !sub.isSelected;
          }
          if(sub.isSelected){
            count++;
          }
          return sub;
        });
        onPress(item.id, updated, count);
    };

    return(<>
        {item.subcategory?.map((sub, index) => (
            <CheckBox key={sub.id}
            onPress={() => setValue(sub.id)} 
            title={sub.val}
            isChecked={sub.isSelected} />
        ))}
    </>)
}

function AccordianComp() {
    const [data, setData] = useState([]);

    useEffect(()=> {
        getData().
        then(data => {
            if(data){
                setData(data);
            } else{
                setData(CONTENT);
                storeData(CONTENT);
            }
        })
    },[]);

    const updateCategory = (id) => {
      // var count = 0;
        var updatedCat = data.map((item, index) => {
            // if(count >= 2){
            //   Alert.alert('2 items selected');
            // }
            if(item.id === id){
                var val = !item.isSelected
                item.isSelected = val;
                for(let sub of item.subcategory){
                  sub.isSelected = val;
                }
            }
            // if(item.isSelected){
            //   count++;
            // }
            return item;
        })

        setData(updatedCat);
        storeData(updatedCat);
    }

    const updateSubCategory = (id,subcat,count) => {
        var updatedCat = data.map((item, index) => {
            if(item.id === id){
              if(count > 0){
                item.isSelected = true;
              } else{
                item.isSelected = false;
              }
              item.subcategory = subcat;
            } 
            return item;
        })
        setData(updatedCat);
        storeData(updatedCat);
    }

    return (
        <SafeAreaView style={styles.container}>
        <Header/>
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.container}>

            {data ? 
            data.map((item, index) => (
            <AccordionItem key={item.id} 
            title={item.category_name}
            onPress={() => updateCategory(item.id)}
            isChecked={item.isSelected}>
                <AccordianContent item={item} onPress={updateSubCategory}/>
            </AccordionItem>

            ))
        : <Text>Data load failed</Text>}
        </ScrollView>
        </SafeAreaView>
    );
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  accordContainer: {
    paddingBottom: 4
  },
  accordHeader: {
    padding: 10,
    backgroundColor:colors.blue,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  accordTitle: {
    fontSize: 20,
    color: colors.white,
  },
  accordBody: {
    padding: 12
  },
  textSmall: {
    fontSize: 16
  },
  seperator: {
    height: 12
  },
  eye:{
    width: 24,
    height: 24,
    marginRight:8
}
});

export default AccordianComp;
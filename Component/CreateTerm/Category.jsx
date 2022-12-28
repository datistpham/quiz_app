import { useQuery } from '@apollo/client'
import React from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import GET_CATEGORIES from '../../graphql/query/get_categories'
import {Picker} from "@react-native-picker/picker"

const Category = (props) => {
  const {data, error, loading}= useQuery(GET_CATEGORIES)
  const categoryList= ()=> {
    return (
        data?.GET_CATEGORIES?.map((item, key)=> <Picker.Item label={item?.category} value={item?.category} key={key} />)
    )
  }
  return (
    <View style={{borderWidth: 1, borderStyle: "solid", borderColor: "#e7e7e7", width: 150, borderRadius: 10, marginBottom: 12}}>
        {
            loading=== true && <ActivityIndicator size={"large"} color={"#2e89ff"} />
        }
        {
            loading=== false && <Picker
                selectedValue={props?.category}
                onValueChange={(value)=> props?.setCategory(value)}
                style={{ height: 50, width: 150, borderWidth: 1, borderStyle: "solid", borderColor: "#e7e7e7"}}
            > 
                {categoryList()}
            </Picker>
        }

    </View>
  )
}

export default Category

import React, {Component} from "react";
import {View, Text, Pressable,ActivityIndicator ,StyleSheet, FlatList} from 'react-native';
import Http from '../../libs/http';  
import CoinsItem from "./CoinsItem";
import colors from "../../res/colors";
import CoinSearch from "./CoinSearch";

class CoinsScreen extends Component{

    state={
        coins:[],
        allCoins:[],
        loading:false
    }
    componentDidMount=()=>{
        this.getCoins();
    }
    getCoins=async()=>{
        this.setState({loading:true})
        const res=await Http.instance.get('https://api.coinlore.net/api/tickers/');    
        this.setState({coins:res.data, allCoins:res.data, loading:false})
    }
    handlePress=(coin)=>{
        this.props.navigation.navigate('CoinDetail',{coin});
    }
    handleSeach=(query)=>{
        const {allCoins}=this.state;
        const coinsFiltered=allCoins.filter((coin)=>{
            return coin.name.toLowerCase().includes(query.toLowerCase()) || coin.symbol.toLowerCase().includes(query.toLowerCase());
        })
        this.setState({coins:coinsFiltered});
    }
    render(){
        const {coins, loading}=this.state;
        return (
            <View style={styles.container}>
                <CoinSearch onChange={this.handleSeach} />
                {loading ? 
                    <ActivityIndicator color='#fff' size='large' style={styles.loader} />
                    :null
                }
                <FlatList
                    data={coins}
                    renderItem={({item})=><CoinsItem item={item} onPress={()=>this.handlePress(item)}/>}
                />
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.charade
    },
    titleText:{
        color:'#000',
        textAlign:'center'
    },  
    btn:{
        padding: 8,
        backgroundColor:'blue',
        borderRadius:8,
        margin:16
    },
    btnText:{
        color:"#fff",
        textAlign:'center'
    },
    loader:{
        flex:1,
        justifyContent:'center'
    }
})

export default CoinsScreen;


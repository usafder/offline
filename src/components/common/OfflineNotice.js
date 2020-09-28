import React from 'react'
import { Text, View, NetInfo, StyleSheet } from 'react-native';

class OfflineNotice extends React.Component {
    state = { networkStatus: 'online' };

    componentWillMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    }
    
    handleConnectivityChange = (isConnected) => {
        if(isConnected) {
            fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => {
                // successful request shows network is online
                this.setState({ networkStatus: 'online' })
            })
            .catch((error) => {
                // failed request shows network is limited
                this.setState({ networkStatus: 'limited' });
            });
        } else {
            this.setState({ networkStatus: 'offline' });
        }
    }

    renderNotice() {
        const { networkStatus } = this.state;
        const { textStyle } = styles;

        switch(networkStatus) {
            case 'offline':
                return <Text style={[textStyle, { backgroundColor: 'red' }]}>Offline</Text>;
            case 'limited':
                return <Text style={[textStyle, { backgroundColor: 'orange' }]}>Limited</Text>;
            default:
                return <Text style={[textStyle, { backgroundColor: 'limegreen' }]}>Online</Text>;
        }
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                {this.renderNotice()}
            </View>
        );
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        marginTop:24
    },
    textStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        paddingTop: 4,
        paddingBottom: 4
    }
});

export { OfflineNotice };

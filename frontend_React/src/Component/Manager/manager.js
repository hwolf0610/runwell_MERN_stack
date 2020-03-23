import React from 'react';
import main_page from '../../assets/img/main_page.png'

export default class Manager extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div className="App">
                <div style={{ position: 'relative' }}>
                    <img src={main_page} width="80%" />
                    <div style={{ position: 'absolute', top: '30%', left: '30%', padding_left: '10px', padding_top: '10px', font_size: '16px', z_index: '5' }}>
                        <div style={{ position: 'relative', }}>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


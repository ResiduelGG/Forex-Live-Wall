import React, { Component } from 'react';
import CurrencyForm from './components/CurrencyForm';

import './App.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CurrencyWall from './components/CurrencyWall';

type AppState = {
    currency: string | null;
};

export default class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            currency: null,
        };
    }

    handleSubmit = (data: { currency: string }) => {
        this.setState({
            currency: data.currency,
        });
    };

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className="paper">
                    <Typography component="h1" variant="h3">
                        Forex Live Wall
                    </Typography>
                    <CurrencyForm onCurrencySubmit={this.handleSubmit} />
                </div>

                {this.state.currency && <CurrencyWall currencyTicker={this.state.currency} />}

                <Box mt={8}>
                    <Typography variant="body2" color="textSecondary" align="center">
                        {'Sample Task | '}
                        <Link color="inherit" href="https://github.com/ResiduelGG/Forex-Live-Wall">
                            ResiduelGG / Forex-Live-Wall
                        </Link>
                        {' | 2020'}
                    </Typography>
                </Box>
            </Container>
        );
    }
}

import React, { Component, Fragment } from 'react';
import ForexData from '../../utils/ForexData';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CONFIG from '../../utils/config';

interface ForexCurrency {
    ticker: string;
    bid: string;
    ask: string;
    open: string;
    low: string;
    high: string;
    changes: number;
    date: string;
}

type WallProps = {
    currencyTicker: string;
};

type WallState = {
    currency: ForexCurrency | null;
};

export default class CurrencyWall extends Component<WallProps, WallState> {
    constructor(props: WallProps) {
        super(props);

        this.state = {
            currency: null,
        };
    }

    componentDidMount() {
        setInterval(() => this.getForexData(), CONFIG.pollTime * 1000);
        this.getForexData();
    }

    getForexData = async () => {
        try {
            const forexDataResponse = await ForexData;
            const currency = forexDataResponse.forexList.find(
                (element: ForexCurrency) => element.ticker === this.props.currencyTicker,
            );

            this.setState({
                currency: currency !== undefined ? currency : null,
            });
        } catch (e) {
            console.log(e); // TODO - Error handling
        }
    };

    render() {
        if (this.state.currency === null) {
            return null;
        }

        return (
            <Fragment>
                <Typography component="h2" variant="h6" align="center">
                    {this.props.currencyTicker}
                </Typography>

                <Grid container>
                    <Grid item xs>
                        <Grid container item direction="column">
                            <Grid item>
                                <Typography variant="subtitle2">BID</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">{this.state.currency.bid}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item direction="column">
                            <Grid item>
                                <Typography variant="subtitle2">HIGH</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">{this.state.currency.high}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item direction="column">
                            <Grid item>
                                <Typography variant="subtitle2">LOW</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">{this.state.currency.low}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container item direction="column">
                            <Grid item>
                                <Typography variant="subtitle2">ASK</Typography>
                            </Grid>
                            <Grid item>{this.state.currency.ask}</Grid>
                        </Grid>
                        <Grid container item direction="column">
                            <Grid item>
                                <Typography variant="subtitle2">OPEN</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">{this.state.currency.open}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant="subtitle2">CHANGE</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1">{this.state.currency.changes.toFixed(5)}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Fragment>
        );
    }
}

import React, { Component } from 'react';
import ForexData from '../../utils/ForexData';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
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
    error: boolean;
};

export default class CurrencyWall extends Component<WallProps, WallState> {
    constructor(props: WallProps) {
        super(props);

        this.state = {
            currency: null,
            error: false,
        };
    }

    interval!: NodeJS.Timeout;

    componentDidMount(): void {
        this.interval = setInterval(() => this.getForexData(), CONFIG.pollTime * 1000);
        this.getForexData();
    }

    componentWillUnmount(): void {
        clearInterval(this.interval);
    }

    getForexData = async (): Promise<void> => {
        try {
            this.setState({
                currency: null,
                error: false,
            });

            const forexDataResponse = await ForexData;
            const currency = forexDataResponse.forexList.find(
                (element: ForexCurrency) => element.ticker === this.props.currencyTicker,
            );

            if (currency !== undefined) {
                this.setState({
                    currency,
                    error: false,
                });

                return;
            }

            this.setState({
                currency: null,
                error: true,
            });
        } catch (e) {
            console.log(e); // TODO - Output to logger

            this.setState({
                currency: null,
                error: true,
            });
        }
    };

    render(): JSX.Element | null {
        if (this.state.error) {
            return (
                <Typography component="h2" variant="h6" align="center">
                    Something went wrong...
                </Typography>
            );
        }

        if (!this.state.currency) {
            return (
                <div className="circularLoader">
                    <CircularProgress />
                </div>
            );
        }

        return (
            <Card>
                <Typography component="h2" variant="h6" align="center" className="currencyCardTitle">
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
            </Card>
        );
    }
}

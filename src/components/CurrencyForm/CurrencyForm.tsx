import React, { Component, FormEvent, ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

type CurrencyFormState = {
    currency: string;
};

export default class CurrencyForm extends Component<
    { onCurrencySubmit: (data: { currency: string }) => void },
    CurrencyFormState
> {
    constructor(props: { onCurrencySubmit: (data: { currency: string }) => void }) {
        super(props);

        this.state = {
            currency: '',
        };
    }

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value } as any);
    };

    render() {
        let handleSubmit = (event: FormEvent) => {
            event.preventDefault();
            if (this.state.currency.length > 0) {
                this.props.onCurrencySubmit({ currency: this.state.currency });
            }
        };

        return (
            <form className="form" noValidate onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="currency"
                    label="Currency"
                    name="currency"
                    placeholder="EUR/USD"
                    autoFocus
                    onChange={this.handleChange}
                />
                <Button type="submit" fullWidth variant="contained" color="primary" className="submit">
                    Search
                </Button>
            </form>
        );
    }
}

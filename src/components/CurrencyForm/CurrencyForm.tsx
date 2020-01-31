import React, { Component, FormEvent, ChangeEvent } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './CurrencyForm.scss';

type CurrencyFormProps = {
    onCurrencySubmit: (currency: string) => void;
};

type CurrencyFormState = {
    currency: string;
};

export default class CurrencyForm extends Component<CurrencyFormProps, CurrencyFormState> {
    constructor(props: CurrencyFormProps) {
        super(props);

        this.state = {
            currency: '',
        };
    }

    handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value } as any);
    };

    handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
        if (this.state.currency.length > 0) {
            // TODO - Proper validation
            this.props.onCurrencySubmit(this.state.currency);
        }
    };

    render(): JSX.Element {
        return (
            <form className="currencyForm" noValidate onSubmit={this.handleSubmit}>
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
                <Button type="submit" fullWidth variant="contained" color="primary" className="buttonSubmit">
                    Search
                </Button>
            </form>
        );
    }
}

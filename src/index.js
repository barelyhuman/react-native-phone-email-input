import React from 'react'
import { TextInput, View } from 'react-native'
import CountryPicker, {
  CountryModalProvider,
  getAllCountries,
  FlagType,
} from 'react-native-country-picker-modal'
import If from './if'

const isNumber = num => /^\d+$/.test(num)

export default class PhoneEmailMixedInput extends React.Component {
  state = {
    type: 'text',
    country: {},
  }

  constructor(props) {
    super(props)
    this.onValueChange = this.onValueChange.bind(this)
    this.onCountrySelect = this.onCountrySelect.bind(this)
  }

  async componentDidMount() {
    const update = {
      type: 'text',
    }
    if (isNumber(this.props?.value)) {
      const countryData = await getAllCountries(FlagType.FLAT)
      const def = countryData.find(
        x => x.cca2 === this.props.defaultCountryCode
      )
      update.country = def
      update.type = 'mobile'
    }
    this.setState(update)
  }

  onValueChange(text) {
    const update = {
      country: null,
      type: 'text',
    }

    if (isNumber(text)) {
      update.type = 'mobile'
    }
    this.setState(update)
    this.props?.onChange?.(text)
  }

  onCountrySelect(country) {
    this.setState({ country: country })
  }

  render() {
    const {
      value,
      countryPickerProps = {},
      textInputProps = {},
      containerProps = {},
      textContainerProps = {},
    } = this.props

    const country = this.state.country

    const { onSelect: _onCountrySelectPropFn, countryCode: _countryCode } =
      countryPickerProps

    const { onChange: _onChangePropFn, onChangeText: _onChangeTextPropFn } =
      textInputProps

    return (
      <>
        <View {...containerProps}>
          <If condition={this.state.type === 'mobile'}>
            <CountryModalProvider>
              <CountryPicker
                withCallingCode
                withCallingCodeButton
                withCountryNameButton={false}
                withFilter
                countryCode={country?.cca2}
                onSelect={
                  /**@param {import("react-native-country-picker-modal").Country} country*/
                  country => {
                    this.onCountrySelect(country)
                    _onCountrySelectPropFn?.(country)
                  }
                }
                {...countryPickerProps}
              />
            </CountryModalProvider>
          </If>
          <View {...textContainerProps}>
            <TextInput
              placeholder="enter email or phone number"
              placeholderTextColor="#333"
              value={value}
              onChange={_onChangePropFn}
              onChangeText={t => {
                this.onValueChange(t)
                _onChangeTextPropFn?.(t)
              }}
              {...textInputProps}
            />
          </View>
        </View>
      </>
    )
  }
}

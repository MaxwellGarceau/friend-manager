  handleLocationPickerOnChange = (e, area) => {
    let areaName = e.target.options[e.target.selectedIndex].text;
    const selection = e.target.value;
    areaName = !selection ? areaName = '' : areaName;

    this.setState((prevState) => ({ location: {
      ...prevState.location,
      [`${area}Id`]: selection,
      [area]: areaName
    } }), () => {
      switch (area) {
        case 'city':
          break;
        case 'country':
          this.handleLocationRegion();
          // If country is selected reset region and city
          this.setState((prevState) => ({
            location: {
              country: prevState.location.country,
              countryId: prevState.location.countryId
            }
          }));
          break;
        case 'region':
          this.handleLocationCity();
          // If region is selected reset city
          this.setState((prevState) => ({
            location: {
              ...prevState.location,
              city: '',
              cityId: ''
            }
          }));
          break;
        default:
          break;
      }
    });
  };
  handleLocationRegion = async () => {
    const geonameId = this.state.location.countryId;
    const response = await axios.get(`http://api.geonames.org/childrenJSON?username=maxgarceau&geonameId=${geonameId}`);
    const allRegions = response.data.geonames;
    this.setState({ allRegions });
  };
  handleLocationCity = async () => {
    const adminCode1 = this.state.location.regionId;
    const response = await axios.get(`http://api.geonames.org/searchJSON?username=maxgarceau&featureClass=P&cities=cities15000&adminCode1=${adminCode1}`);
    const allCities = response.data.geonames;
    this.setState({ allCities });
  };
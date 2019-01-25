import React,{Component} from 'react';
import {Box,Heading,Container,Image,Card,Text,SearchField,Icon,Spinner} from "gestalt";
import { Link } from "react-router-dom";
import Strapi from 'strapi-sdk-javascript/build/main';
const apiUrl=process.env.API_URL || 'http://localhost:1337';
const strapi= new Strapi(apiUrl);
class App extends Component {
 state ={
  brands: [],
  searchTerm: "",
  loadingBrands:true
 }
 
  async componentDidMount(){
   try{
    const response =await strapi.request('POST',"/graphql",{
data:{
query:`query {
  brands {
    id
    name
    description
    image {
      id
      mime
      url
      name
    }
  }
}`



}

    });
    console.log(response); 
    this.setState({brands:response.data.brands,loadingBrands:false})
  }catch(err){
    console.log(err);
    this.setState({loadingBrands:false});
  }
 
  }
  handleChange=({value})=>{
    this.setState({searchTerm:value});
  };
  filteredBrands=({searchTerm,brands})=>{
    return brands.filter(brand => {
  
      return brand.name.toString().toLowerCase().includes(searchTerm)||brand.description.toString().toLowerCase().includes(searchTerm);
    });
  
  };
  render() {
    const {searchTerm ,loadingBrands}=this.state;
    return (
    <Container>
<Box display="flex" justifyContent="center" margin={4} > 
  <SearchField
  id="seachField"
  
  accessibilityLabel="Brands search field"
  onChange={this.handleChange}
  value={searchTerm}
  placeholder="Search Brands"
  />
  <Box margin={2} >
<Icon icon="filter"
color={searchTerm?'orange':'gray'} 
size={20}
accessibilityLabel="search"
/>
  </Box>
</Box>

      <Box
      display="flex"
      justifyContent="center"
      marginBottom={2}
      >
<Heading color="midnight" size="md">
Mac Brands
</Heading>
      </Box>
  {/*Brands */}  
  
  <Box wrap
    dangerouslySetInlineStyle={{
      __style: {
        backgroundColor: "#d6c8ec"
      }
    }}
    shape="rounded"
  display="flex" justifyContent="around">
          {this.filteredBrands(this.state).map(brand => (
            <Box paddingY={4} margin={2} width={200} key={brand.id}>
              <Card
                image={
                  <Box height={200} width={200}>
                    <Image
                        fit="cover"
                      alt="Brand"
                      naturalHeight={1}
                      naturalWidth={1}
                      src={`${apiUrl}${brand.image.url}`}
                    />
                  </Box>
                }
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  direction="column"
                >
                  <Text bold size="xl">
                    {brand.name}
                  </Text>
                  <Text>{brand.description}</Text>
                  <Text bold size="xl">
                    <Link to={`/${brand.id}`}>See Brews</Link>
                  </Text>
                </Box>
              </Card>
            </Box>
          ))}
  </Box>
  {/* End Brands */}
  <Spinner show={loadingBrands} accessibilityLabel="loading Spinner" />
  </Container>
    );
  }
}

export default App;

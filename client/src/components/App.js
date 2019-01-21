import React,{Component} from 'react';
import {Box,Heading,Container,Image,Card,Text} from "gestalt";
import { Link } from "react-router-dom";
import Strapi from 'strapi-sdk-javascript/build/main';
const apiUrl=process.env.API_URL || 'http://localhost:1337';
const strapi= new Strapi(apiUrl);
class App extends Component {
 state ={
   brands:[]
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
    this.setState({brands:response.data.brands})
  }catch(err){
    console.log(err);
  }
 
  }
  render() {
    const {brands}=this.state;
    return (
    <Container>
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
  
  <Box display="flex" justifyContent="around">
          {brands.map(brand => (
            <Box margin={2} width={200} key={brand.id}>
              <Card
                image={
                  <Box height={200} width={200}>
                    <Image
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
  </Container>
    );
  }
}

export default App;

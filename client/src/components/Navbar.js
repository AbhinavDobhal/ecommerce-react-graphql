import React from 'react';
import {Box ,Text, Heading} from "gestalt";
import {NavLink} from "react-router-dom";

const Navbar = () =>(
<Box 
display="flex"
alignItems="center"
justifyContent='around'
height={70} 
color="midnight" 
padding={1} 
shape="roundedBottom" 
 >
<NavLink activeClassName="active" to={'/signin'} ><Text size="xl" color="white" >Sign In</Text></NavLink>
<NavLink  activeClassName="active" exact to={'/'}>
<Heading size="xs" color="orange">
Mac Brand
</Heading>

</NavLink>
<NavLink  activeClassName="active" to={'/signup'}  ><Text size="xl" color="white" >Sign Up</Text></NavLink>


</Box> 
)
export default Navbar;

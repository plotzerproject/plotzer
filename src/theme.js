import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

//informações adicionais do tema como cor e talz
const customTheme = {
    styles: {
        global: (props) => ({
          body: {
            bg: mode("blue.400",'blue.700')(props),
          }
        })
      },
    components: {
        Button: {
            variants: {
                solid: (props)=>({
                    bg: mode("orange.400", "orange.600")(props),
                    _hover: {
                        bg: mode("orange.300", "orange.500")(props),
                    },
                    _active: {
                        bg: mode("orange.500", "orange.700")(props),
                    }
                })
            }
        }
    }
    
}

const theme = extendTheme(customTheme)

export default theme
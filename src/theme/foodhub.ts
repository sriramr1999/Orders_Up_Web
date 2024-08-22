import {
    createTheme,
    ThemeOptions,
    lighten,
    darken,
  } from '@mui/material/styles'
  
  /**
   * Global Default Constants
   */
  const fontFamily = 'Lato, sans-serif'
  const htmlFontSize = 16
  
  /**
   * Global Theme Colors
   */
  const primaryColor = '#ED515B'
  const secondaryColor = '#888888'
  const successColor = '#5bae75'
  const errorColor = '#d82927'
  const infoColor = '#1976d2'
  
  /**
   * Default variants
   */
  const defaultDensity = 'dense' // 'regular' | 'dense'
  const defaultVariant = 'outlined'
  
  /**
   * Computed Properties
   */
  const isDense = defaultDensity === 'dense'
  
  /**
   * Import Fonts -
   *
   * background changed to inherit for MuiTextField
   */
  export const lightTheme: ThemeOptions = createTheme({
    typography: {
      fontFamily,
      htmlFontSize,
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: 'inherit',
            '& .MuiInputBase-root': { backgroundColor: '#fff' },
            '& .MuiFormHelperText-root': {
              backgroundColor: 'inherit',
              margin: 0,
            },
            '& .MuiOutlinedInput-root': { paddingLeft: 4 },
            '& .MuiInputBase-multiline': { paddingLeft: 12 },
          },
        },
      },
      MuiToolbar: { defaultProps: { variant: defaultDensity } },
      MuiAppBar: { defaultProps: { variant: defaultVariant } },
      MuiPaper: { defaultProps: { variant: defaultVariant } },
      MuiDrawer: { styleOverrides: { paper: {} } },
      MuiAccordion: { styleOverrides: {} },
      MuiList: { defaultProps: { dense: isDense } },
      MuiListItem: { defaultProps: { dense: isDense } },
      MuiListItemButton: { defaultProps: { dense: isDense } },
      MuiListItemIcon: { defaultProps: {} },
      MuiIconButton: { defaultProps: { size: 'small' } },
      MuiTableContainer: { styleOverrides: { root: { borderRadius: '8px' } } },
      MuiTable: { defaultProps: { size: 'small' } },
      MuiTableHead: {
        styleOverrides: {
          root: {
            '& .MuiTableRow-root': {
              '& .MuiTableCell-root': {
                backgroundColor: '#f7f7f7',
                fontWeight: 'bold',
              },
            },
          },
        },
      },
      MuiTableRow: {
        defaultProps: { hover: true },
        styleOverrides: {
          root: {
            cursor: 'pointer',
            '&:last-child': {
              '& .MuiTableCell-root': { borderBottom: 'none' },
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            '& .MuiSvgIcon-root': {
              cursor: 'pointer',
              fontSize: '18px',
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          root: {
            '& .MuiDialog-paper': {
              borderRadius: '8px',
              padding: '20px',
            },
            '& .MuiDialogContent-root': {
              paddingLeft: 0,
              paddingRight: 0,
              marginBottom: '5px',
              border: 'none',
              paddingTop: '20px !important',
              paddingBottom: '20px !important',
            },
            '& .MuiDialogTitle-root': {
              padding: 0,
            },
            '& .MuiDialog-paperWidthLg': {
              padding: '20px',
            },
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            '&.MuiDivider-textAlignLeft::before': {
              width: '2% !important',
            },
            '&.MuiDivider-textAlignLeft::after': {
              width: '98% !important',
            },
          },
        },
      },
      MuiButton: {
        defaultProps: { variant: defaultVariant, size: 'small' },
        styleOverrides: {
          root: {
            borderRadius: 8,
            '&.MuiButton-containedSuccess': {
              color: 'white',
            },
            '&.MuiButton-outlined': {
              color: primaryColor,
            },
          },
        },
      },
      MuiLink: {
        defaultProps: { color: infoColor, fontSize: 'inherit' },
        styleOverrides: {
          root: {
            padding: 8,
            '&:hover': {
              cursor: 'pointer',
            },
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            '&.MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon .MuiOutlinedInput-root':
              {
                paddingRight: '50px',
              },
          },
        },
      },
  
      MuiFormControl: {
        defaultProps: { variant: defaultVariant },
        styleOverrides: {
          root: {
            backgroundColor: '#f7f7f7', // Original shade
            '& .MuiFormLabel-root.MuiFormLabel-filled': {
              backgroundColor: '#f7f7f7',
            },
            '& .MuiFormLabel-root.Mui-focused': {
              color: '#1976d2',
            },
            '& .MuiOutlinedInput-root .MuiInputAdornment-root': {
              padding: 8,
              margin: 0,
            },
            '& .MuiOutlinedInput-root.Mui-disabled .MuiInputAdornment-root .MuiTypography-root':
              {
                color: 'rgba(0, 0, 0, 0.38)',
              },
            '& .MuiInputBase-adornedEnd': {
              paddingRight: 0,
            },
            '& .MuiOutlinedInput-root.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#1976d2', // Blue
              },
            },
          },
        },
      },
    },
    palette: {
      mode: 'light',
      background: {
        default: '#f7f7f7',
        paper: '#ffffff',
      },
      primary: {
        main: primaryColor,
        light: lighten(primaryColor, 0.1),
        dark: darken(primaryColor, 0.4),
      },
      secondary: {
        main: secondaryColor,
        light: lighten(secondaryColor, 0.1),
        dark: darken(secondaryColor, 0.4),
      },
      error: {
        // main: '#d82927',
        main: errorColor,
        light: lighten(errorColor, 0.1),
        dark: darken(errorColor, 0.4),
      },
      info: {
        main: infoColor,
        // light: 'rgba(71, 143, 236, 0.08)',
        light: lighten(infoColor, 0.1),
      },
      success: {
        main: successColor,
        light: lighten(successColor, 0.1),
        dark: darken(successColor, 0.4),
      },
    },
  })
  
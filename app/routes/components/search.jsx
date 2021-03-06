import * as React from 'react'
import { useSearchParams } from 'remix'
import useMediaQuery from '@mui/material/useMediaQuery'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button'
import GradeIcon from '@mui/icons-material/Grade'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Paper from '@mui/material/Paper'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import {
    getDefaultPageCountValue,
    getDefaultBookDuration,
    getDefaultMinRating,
    getDefaultAutocompleteValues
} from '../../utils/search'

export default function Search({ genreList }) {
    const [searchParams] = useSearchParams()
    const isLargerThanMobile = useMediaQuery('(min-width:600px)')
    const [pageCountValue, setPageCountValue] = React.useState(getDefaultPageCountValue(searchParams))
    const [bookDurationValue, setBookDurationValue] = React.useState(getDefaultBookDuration(searchParams))
    const [minRating, setMinRating] = React.useState(getDefaultMinRating(searchParams))
    const [open, setOpen] = React.useState(false)
    const [activeStep, setActiveStep] = React.useState(0)
    const [bookLengthSelector, setBookLengthSelectorChange] = React.useState('page-count')

    const defaultAutocompleteValues = getDefaultAutocompleteValues(searchParams, genreList)

    const [selectedGenreIds, setSelectedGenreIds] = React.useState(defaultAutocompleteValues.map(genre => genre.genreId))

    const handleNext = (e) => {
        e.preventDefault()
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const handleReset = (e) => {
        e.preventDefault()
        setActiveStep(0)
    }
    const handlePageCountChange = (e, newValue) => {
        setPageCountValue(newValue)
    }

    const handleBookDurationChange = (event, newValue) => {
        setBookDurationValue(newValue)
    }

    const handleRatingChange = (event) => {
        setMinRating(event.target.value)
    }

    const handleRatingSelectClose = () => {
        setOpen(false)
    }

    const handleRatingSelectOpen = () => {
        setOpen(true)
    }

    const handleBookLengthSelectorChange = (event) => {
        setBookLengthSelectorChange(event.target.value)
    }

    const getPageRange = () => {
        if (bookLengthSelector === 'page-count') {
            return {
                minPages: pageCountValue[0],
                maxPages: pageCountValue[1]
            }
        }

        // 40 pages in 60 minutes. Statistics show that quick readers can even go through 50 or 60 pages in one hour
        return {
            minPages: ((bookDurationValue[0] * 40) - 50),
            maxPages: ((bookDurationValue[1] * 40) + 50)
        }
    }

    const renderGenreSelect = () => {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <Autocomplete
                    sx={{ minWidth: '200px', margin: '0.7em', width: isLargerThanMobile ? '600px' : '150px' }}
                    multiple
                    defaultValue={defaultAutocompleteValues}
                    id='tags-outlined'
                    options={genreList}
                    getOptionLabel={(option) => option.genre}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder='Science Fiction'
                        />
                    )}
                    onChange={(event, selectedGenres) => {
                        setSelectedGenreIds(selectedGenres.map(genre => genre.genreId))
                    }}
                />
            </Box>
        )
    }

    const renderPageCountSlider = () => {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', padding: '50px' }}>
                <Slider
                    name='pageCountSlider'
                    getAriaLabel={() => 'Number of Pages'}
                    value={pageCountValue}
                    onChange={handlePageCountChange}
                    step={100}
                    min={50}
                    max={2500}
                    valueLabelDisplay='on'
                    sx={{
                        color: 'primary.light',
                        width: isLargerThanMobile ? '300px' : '150px'
                    }}
                />
            </Box>
        )
    }

    const renderReadingDurationPicker = () => {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', padding: '50px', width: '100%' }}>
                <Slider
                    name='readingDurationSlider'
                    getAriaLabel={() => 'Number of Pages'}
                    value={bookDurationValue}
                    onChange={handleBookDurationChange}
                    valueLabelDisplay='on'
                    step={1}
                    min={1}
                    max={50}
                    sx={{
                        color: 'primary.light'
                    }}
                />
            </Box>
        )
    }

    const renderLengthSelector = () => {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: isLargerThanMobile ? '500px' : '250px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <FormControl component='fieldset'>
                        <RadioGroup defaultValue='page-count' row aria-label='total-page-or-read-duration' name='row-radio-buttons-group' onChange={handleBookLengthSelectorChange}>
                            <FormControlLabel value='page-count' control={<Radio />} label='Pages' />
                            <FormControlLabel value='duration' control={<Radio />} label='Maximum reading time (hours)' />
                        </RadioGroup>

                        {bookLengthSelector === 'page-count' ? renderPageCountSlider() : renderReadingDurationPicker()}

                    </FormControl>
                </Box>
            </Box>
        )
    }

    const renderRatingSelect = () => {
        return (
            <Box sx={{ minWidth: 120, width: 250, display: 'flex', justifyContent: 'flex-start' }}>
                <FormControl sx={{ m: 1, minWidth: 120, margin: '1em' }}>
                    <InputLabel id='demo-controlled-open-select-label'>Minimum Rating</InputLabel>
                    <Select
                        labelId='demo-controlled-open-select-label'
                        id='demo-controlled-open-select'
                        name='minRating'
                        open={open}
                        onClose={handleRatingSelectClose}
                        onOpen={handleRatingSelectOpen}
                        value={minRating}
                        label='Minimum Rating'
                        onChange={handleRatingChange}
                    >
                        <MenuItem value=''>
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}><GradeIcon /></MenuItem>
                        <MenuItem value={2}><GradeIcon /><GradeIcon /></MenuItem>
                        <MenuItem value={3}><GradeIcon /><GradeIcon /><GradeIcon /></MenuItem>
                        <MenuItem value={4}><GradeIcon /><GradeIcon /><GradeIcon /><GradeIcon /></MenuItem>
                        <MenuItem value={5}><GradeIcon /><GradeIcon /><GradeIcon /><GradeIcon /><GradeIcon /></MenuItem>
                    </Select>
                </FormControl>
            </Box>
        )
    }

    const steps = [
        {
            label: 'Choose the genres you like',
            renderAdditionalContent: renderGenreSelect
        },
        {
            label: 'Choose your ideal book length',
            renderAdditionalContent: renderLengthSelector
        },
        {
            label: 'Choose the minimum rating',
            renderAdditionalContent: renderRatingSelect
        }
    ]

    return (
        <form action='/books' method='GET'>
            <Box sx={{
                borderBottom: '1px solid lightgrey',
                margin: '10px',
                padding: '10px',
                display: 'flex',
                alignItems: 'middle',
                justifyContent: 'flex-start'
            }}
            >
                <input type='hidden' name='genreIds' value={selectedGenreIds.join()} />
                <input type='hidden' name='minPages' value={getPageRange().minPages} />
                <input type='hidden' name='maxPages' value={getPageRange().maxPages} />

                <Stepper activeStep={activeStep} orientation='vertical'>
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel
                                optional={
                                    index === 2
                                        ? (
                                            <Typography variant='caption'>Last step</Typography>
                                        )
                                        : null
                                }
                            >
                                {step.label}
                            </StepLabel>
                            <StepContent>
                                <Typography>{step.description}</Typography>
                                {step.renderAdditionalContent()}

                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        {
                                            index === steps.length - 1
                                                ? (
                                                    <Button
                                                        variant='contained'
                                                        sx={{ mt: 1, mr: 1 }}
                                                        type='submit'
                                                    >
                                                        Finish
                                                    </Button>
                                                )
                                                : (
                                                    <Button
                                                        variant='contained'
                                                        onClick={(e) => handleNext(e, index === steps.length - 1)}
                                                        sx={{ mt: 1, mr: 1 }}
                                                        disabled={selectedGenreIds.length === 0}
                                                    >
                                                        Continue
                                                    </Button>
                                                )
                                        }
                                        <Button
                                            disabled={index === 0}
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper square elevation={0} sx={{ p: 3 }}>
                        <Typography>All steps completed - you&apos;re finished</Typography>
                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                            Reset
                        </Button>
                    </Paper>
                )}
            </Box>
        </form>
    )
}

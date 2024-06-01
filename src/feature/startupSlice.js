import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    startups: [
        {
            _id: "6654531473ec8b947f3ff670",
            User: "6656b0023574bce7a4c10d25",
            StartUpName: "TechWave",
            Logo: "https://optimise2.assets-servd.host/dig-upsiide/production/images/starbsloh.png?w=735&h=400&q=100&fm=jpg&fit=crop&dm=1668098882&s=3ee470c8b1123213d7f7f147bc1126e4",
            FounderName: "Alice Smith",
            CompanyDes: "TechWave is revolutionizing the tech industry with cutting-edge software solutions for businesses.",
            FoundingYear: 2018,
            Growth: [
                {
                    Revenue: 1200000,
                    Year: 2021,
                    _id: "6654531473ec8b947f3ff671"
                }
            ],
            NumberOfEmployees: 50,
            TargetMarket: "Technology Industry",
            CurrentStage: "Scaling",
            KeyFeatures: "Software Solutions, Business Automation",
            Investors: "Angel Investors Group",
            Evaluation: 4500,
            Revenue: 1200000,
            FundingRaised: [
                {
                    CompanyName: "Angel Investors Group",
                    EquityHolds: 15,
                    Amount: 1500000,
                    _id: "6654531473ec8b947f3ff672"
                }
            ],
            ContactInformation: {
                CompanyEmail: "info@techwave.com",
                Phone: "987-654-3210",
                LinkedInProfile: "linkedin.com/company/techwave",
                CompanyWebsite: "techwave.com",
                OfficeAddress: "456 Tech Street, San Francisco, CA, USA"
            },
            __v: 0
        },
        {
            _id: "6654531473ec8b947f3ff673",
            User: "6656b0023574bce7a4c10d26",
            StartUpName: "GreenEarth",
            Logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2nDTMG6nlpOk5eS3U-oVOkGDEQxGkOQ7BrA&s",
            FounderName: "Bob Johnson",
            CompanyDes: "GreenEarth provides innovative solutions for sustainable agriculture and environmental conservation.",
            FoundingYear: 2017,
            Growth: [
                {
                    Revenue: 950000,
                    Year: 2021,
                    _id: "6654531473ec8b947f3ff674"
                }
            ],
            NumberOfEmployees: 30,
            TargetMarket: "Agriculture",
            CurrentStage: "Growth",
            KeyFeatures: "Sustainable Agriculture, Environmental Conservation",
            Investors: "Eco Ventures",
            Evaluation: 3500,
            Revenue: 950000,
            FundingRaised: [
                {
                    CompanyName: "Eco Ventures",
                    EquityHolds: 25,
                    Amount: 1000000,
                    _id: "6654531473ec8b947f3ff675"
                }
            ],
            ContactInformation: {
                CompanyEmail: "contact@greenearth.com",
                Phone: "555-123-4567",
                LinkedInProfile: "linkedin.com/company/greenearth",
                CompanyWebsite: "greenearth.com",
                OfficeAddress: "789 Green Lane, Portland, OR, USA"
            },
            __v: 0
        },
        {
            _id: "6654531473ec8b947f3ff676",
            User: "6656b0023574bce7a4c10d27",
            StartUpName: "EduTechPro",
            Logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0pKLF0QSR2f8EZy5qhmmXCEJuP5Y9nLHyfg&s",
            FounderName: "Carol Lee",
            CompanyDes: "EduTechPro is an edtech startup that offers AI-driven learning solutions for students worldwide.",
            FoundingYear: 2019,
            Growth: [
                {
                    Revenue: 1100000,
                    Year: 2022,
                    _id: "6654531473ec8b947f3ff677"
                }
            ],
            NumberOfEmployees: 40,
            TargetMarket: "Education",
            CurrentStage: "Scaling",
            KeyFeatures: "AI-driven Learning, Global Education Solutions",
            Investors: "Edu Ventures",
            Evaluation: 5000,
            Revenue: 1100000,
            FundingRaised: [
                {
                    CompanyName: "Edu Ventures",
                    EquityHolds: 18,
                    Amount: 1200000,
                    _id: "6654531473ec8b947f3ff678"
                }
            ],
            ContactInformation: {
                CompanyEmail: "support@edutechpro.com",
                Phone: "444-321-6789",
                LinkedInProfile: "linkedin.com/company/edutechpro",
                CompanyWebsite: "edutechpro.com",
                OfficeAddress: "101 Learning Road, Boston, MA, USA"
            },
            __v: 0
        },
        {
            _id: "6654531473ec8b947f3ff679",
            User: "6656b0023574bce7a4c10d28",
            StartUpName: "Healthify",
            Logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzlJIo2OArwn3I768Rh0oWb_xwqiBBMp65Ig&s",
            FounderName: "David Brown",
            CompanyDes: "Healthify is dedicated to improving healthcare accessibility through telemedicine and digital health platforms.",
            FoundingYear: 2020,
            Growth: [
                {
                    Revenue: 1300000,
                    Year: 2023,
                    _id: "6654531473ec8b947f3ff680"
                }
            ],
            NumberOfEmployees: 60,
            TargetMarket: "Healthcare",
            CurrentStage: "Expansion",
            KeyFeatures: "Telemedicine, Digital Health",
            Investors: "Health Ventures",
            Evaluation: 6000,
            Revenue: 1300000,
            FundingRaised: [
                {
                    CompanyName: "Health Ventures",
                    EquityHolds: 22,
                    Amount: 1600000,
                    _id: "6654531473ec8b947f3ff681"
                }
            ],
            ContactInformation: {
                CompanyEmail: "hello@healthify.com",
                Phone: "333-654-9870",
                LinkedInProfile: "linkedin.com/company/healthify",
                CompanyWebsite: "healthify.com",
                OfficeAddress: "123 Wellness Blvd, Los Angeles, CA, USA"
            },
            __v: 0
        },
        {
            _id: "6654531473ec8b947f3ff682",
            User: "6656b0023574bce7a4c10d29",
            StartUpName: "FinTech Innovators",
            Logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4iA-VKtFd_7hQzAqj719rx52o96wBUBA5jg&s",
            FounderName: "Emma Davis",
            CompanyDes: "FinTech Innovators provides advanced financial technology solutions for small and medium-sized enterprises.",
            FoundingYear: 2016,
            Growth: [
                {
                    Revenue: 900000,
                    Year: 2021,
                    _id: "6654531473ec8b947f3ff683"
                }
            ],
            NumberOfEmployees: 35,
            TargetMarket: "Financial Services",
            CurrentStage: "Growth",
            KeyFeatures: "Financial Technology, SME Solutions",
            Investors: "FinTech Angels",
            Evaluation: 4200,
            Revenue: 900000,
            FundingRaised: [
                {
                    CompanyName: "FinTech Angels",
                    EquityHolds: 20,
                    Amount: 1100000,
                    _id: "6654531473ec8b947f3ff684"
                }
            ],
            ContactInformation: {
                CompanyEmail: "contact@fintechinnovators.com",
                Phone: "222-987-1234",
                LinkedInProfile: "linkedin.com/company/fintech-innovators",
                CompanyWebsite: "fintechinnovators.com",
                OfficeAddress: "456 Finance Drive, New York, NY, USA"
            },
            __v: 0
        }
    ],
    loading: true,
    error: null,
}

const startupSlice = createSlice({
    name: 'startups',
    initialState,
    reducers: {
        addStartup: (state, action) => {
            state.loading = false;
            state.startups.push(action.payload);
        },
        updateStartup: (state, action) => {
            const updatedStartup = action.payload;
            const index = state.startups.findIndex(startup => startup._id === updatedStartup._id);
            if (index !== -1) {
                state.startups[index] = updatedStartup;
            }
        },
        deleteStartup: (state, action) => {
            const _id = action.payload;
            const updatedStartups = state.startups.filter(startup => startup._id !== _id);
            state.startups = updatedStartups;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { addStartup, updateStartup, deleteStartup, setError } = startupSlice.actions;
export default startupSlice.reducer;

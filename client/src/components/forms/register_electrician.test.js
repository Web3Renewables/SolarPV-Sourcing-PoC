import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import ElectricianRegistrationForm from './register_electrician'
import Providers from "@providers/index";

const mockDid = "did:ethr:volta:0x5129Df97ED0a85c3692Dc0789118b61994A5F111"
const mockVerifiedElectrician = true;
const mockHasPendingRoleClaim = true;


describe("not an electrician", () => {

    test("renders correct fields", () => {

        render(

            <Providers>
                <ElectricianRegistrationForm did={mockDid} disableForm={!mockHasPendingRoleClaim || !mockVerifiedElectrician} />
            </Providers>
        );

        expect(screen.getByText("Full Name")).toBeInTheDocument();
        expect(screen.getByText("Address")).toBeInTheDocument();
        expect(screen.getByText("Phone Number")).toBeInTheDocument();
        expect(screen.getByText("Class Type")).toBeInTheDocument();
        expect(screen.getByText("License Number")).toBeInTheDocument();
        expect(screen.getByText("Application Number")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();
        expect(screen.getByText("Expiration Date")).toBeInTheDocument();
        expect(screen.getByText("Effective Date")).toBeInTheDocument();
        expect(screen.getByText("Origination Date")).toBeInTheDocument();
        expect(screen.getByText("Print Date")).toBeInTheDocument();
        expect(screen.getByText("Origination Date")).toBeInTheDocument();
        expect(screen.getByText("Enforcement Action")).toBeInTheDocument();
    });

    test("form disabled when pending claim", () => {

        render(

            <Providers>
                <ElectricianRegistrationForm did={mockDid} disableForm={mockHasPendingRoleClaim || !mockVerifiedElectrician} />
            </Providers>
        );

        expect(screen.getByText("Full Name")).toBeInTheDocument();
        expect(screen.getByText("Address")).toBeInTheDocument();
        expect(screen.getByText("Phone Number")).toBeInTheDocument();
        expect(screen.getByText("Class Type")).toBeInTheDocument();
        expect(screen.getByText("License Number")).toBeInTheDocument();
        expect(screen.getByText("Application Number")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();
        expect(screen.getByText("Expiration Date")).toBeInTheDocument();
        expect(screen.getByText("Effective Date")).toBeInTheDocument();
        expect(screen.getByText("Origination Date")).toBeInTheDocument();
        expect(screen.getByText("Print Date")).toBeInTheDocument();
        expect(screen.getByText("Origination Date")).toBeInTheDocument();
        expect(screen.getByText("Enforcement Action")).toBeInTheDocument();

        const inputs = screen.getAllByRole("textbox")
        inputs.forEach((input) => {
            if(!input.id.includes("date")) {
                expect(input).toHaveClass('ant-input-disabled')
            }
        })
        
    });
});
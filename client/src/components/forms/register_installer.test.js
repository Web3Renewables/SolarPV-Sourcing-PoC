import { render, fireEvent, waitFor, screen, act } from "@testing-library/react";
import { installerGeneralFields, electricianLicenseFields, businessRelationshipFields,buildingContractorLicenseFields,qualifyingBuilderLicenseFields } from "@utils/forms/fields";
import InstallerRegistrationForm from "./register_installer";
import Providers from "@providers/index";

const mockDid = "did:ethr:volta:0x5129Df97ED0a85c3692Dc0789118b61994A5F111"
const mockVerifiedElectrician = true;
const mockHasPendingRoleClaim = true;


describe("not an installer", () => {
    test("clicking 'yes' radio button populates new form", async () => {

        render(
            <Providers>
                <InstallerRegistrationForm did={mockDid} disableForm={!mockHasPendingRoleClaim || !mockVerifiedElectrician} />
            </Providers>
        );

        const buildingContractorRadio = screen.getByTestId('building_contractor_radio_yes')
        const electricianEnforcementActionRadio = screen.getByTestId('electrician_enforcement_action_radio_yes')
        
        await act( async () => {
            fireEvent.click(buildingContractorRadio);
            fireEvent.click(electricianEnforcementActionRadio);
            
        });

        const buildingContractorEnforcementActionRadio = screen.getByTestId('building_contractor_enforcement_action_radio_yes')

        await act( async () => {
            fireEvent.click(buildingContractorEnforcementActionRadio);
        });

        Object.entries(installerGeneralFields).forEach(([k, v]) => {
            expect(screen.getByTestId(v.key)).toBeInTheDocument()
        })

        Object.entries(electricianLicenseFields).forEach(([k, v]) => {
            expect(screen.getByTestId(v.key)).toBeInTheDocument()
        })

        Object.entries(buildingContractorLicenseFields).forEach(([k, v]) => {
            expect(screen.getByTestId(v.key)).toBeInTheDocument()
        })

        Object.entries(qualifyingBuilderLicenseFields).forEach(([k, v]) => {
            // Qualifying builder license form does not have enforcement action, 
            // but is included in the licenseFieldList, just not rendered to screen
            if(v.key !== "qualifying_builder_enforcement_action") {
                expect(screen.getByTestId(v.key)).toBeInTheDocument()
            }
        })
    });

    test("clicking 'no' radio button does not populate new forms", async () => {

        render(
            <Providers>
                <InstallerRegistrationForm did={mockDid} disableForm={!mockHasPendingRoleClaim || !mockVerifiedElectrician} />
            </Providers>
        );

        const buildingContractorRadio = screen.getByTestId('building_contractor_radio_no')
        const electricianEnforcementActionRadio = screen.getByTestId('electrician_enforcement_action_radio_yes')
        
        await act( async () => {
            fireEvent.click(buildingContractorRadio);
            fireEvent.click(electricianEnforcementActionRadio)
        });

        await waitFor(() => {
            expect(screen.queryByText("Building Contractor License")).not.toBeInTheDocument()
        })

        Object.entries(installerGeneralFields).forEach(([k, v]) => {
            expect(screen.getByTestId(v.key)).toBeInTheDocument()
        })

        Object.entries(electricianLicenseFields).forEach(([k, v]) => {
            expect(screen.getByTestId(v.key)).toBeInTheDocument()
        })

        await waitFor(() => {
            Object.entries(buildingContractorLicenseFields).forEach(([k, v]) => {
                expect(screen.queryByTestId(v.key)).not.toBeInTheDocument()
            })
    
            Object.entries(qualifyingBuilderLicenseFields).forEach(([k, v]) => {
                // Qualifying builder license form does not have enforcement action, 
                // but is included in the licenseFieldList, just not rendered to screen
                if(v.key !== "qualifying_builder_enforcement_action") {
                    expect(screen.queryByTestId(v.key)).not.toBeInTheDocument()
                }
            })
        })
    });

    test("form disabled when pending claim", () => {

        render(

            <Providers>
                <InstallerRegistrationForm did={mockDid} disableForm={mockHasPendingRoleClaim || !mockVerifiedElectrician} />
            </Providers>
        );

        const inputs = screen.getAllByRole("textbox")
        inputs.forEach((input) => {
            if(!input.id.includes("date")) {
                expect(input).toHaveClass('ant-input-disabled')
            }
        })
        
    });
});
import { render, fireEvent, waitFor, screen, act } from "@testing-library/react";
import { pvSystemFields, systemOwnerFields } from "@utils/forms/fields";
import Providers from "@providers/index";
import RegisterPVSystem from "./register_pv_system";

const mockDid = "did:ethr:volta:0x5129Df97ED0a85c3692Dc0789118b61994A5F111"
const mockAssetExists = true;


describe("not an installer", () => {
    test("", async () => {

        render(
            <Providers>
                <RegisterPVSystem did={mockDid} disableForm={!mockAssetExists} csrfToken={"temp"} />
            </Providers>
        );

        Object.entries(pvSystemFields).forEach(([k, v]) => {
            expect(screen.getByTestId(v.key)).toBeInTheDocument()
        })

        Object.entries(systemOwnerFields).forEach(([k, v]) => {
            expect(screen.getByTestId(v.key)).toBeInTheDocument()
        })

    });

    test("form disabled when pending claim", () => {

        render(
            <Providers>
                <RegisterPVSystem did={mockDid} disableSystemOwner={mockAssetExists} disablePVSystem={mockAssetExists} />
            </Providers>
        );

        Object.entries(pvSystemFields).forEach(([k, v]) => {
            expect(screen.getByTestId(v.key)).toBeInTheDocument()
        })

        Object.entries(systemOwnerFields).forEach(([k, v]) => {
            expect(screen.getByTestId(v.key)).toBeInTheDocument()
        })

        const inputs = screen.getAllByRole("textbox")
        inputs.forEach((input) => {
            if(!input.id.includes("date")) {
                expect(input).toHaveClass('ant-input-disabled')
            }
        })

    });
});
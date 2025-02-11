import Footer from "../components/Footer";
import Header from "../components/Header";

function Reports() {
    return (
        <div className="h-screen">
            <Header />
            <div className="h-full flex">
                <div className="w-1/4 mx-6">
                    <div className="space-y-12 w-full flex flex-col items-center">
                        <h1 className="text-2xl font-bold">Filter By</h1>
                        <div className="text-comp-1 flex flex-col w-full">
                            <p className="justify-start">Date</p>
                            <div className="flex justify-between items-center space-x-1">
                            <input type="date" className="bg-primary text-comp-1 rounded-md p-1" /> 
                            <p className="font-bold">-</p>
                             <input type="date" className="bg-primary text-comp-1 rounded-md p-1"/>
                            </div>
                        </div>
                        <div className="w-full">
                            <label htmlFor="Category">Category</label>
                            <select id="Category" className="bg-primary text-comp-1 rounded-md outline-none w-full p-1">
                                <option>Youtube</option>
                                <option>Super Low Poly</option>
                                <option>Lmao</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <h2 className="">Status</h2>
                            <div className="flex justify-evenly">
                                <div className="flex space-x-2">
                                    <input type="radio" name="status" id="active" />
                                    <p>Active</p>
                                </div>
                                <div className="flex space-x-2">
                                    <input type="radio" name="status" id="Inactive" />
                                    <p>Inactive</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full space-y-4 px-4">
                    <div className="flex space-x-2 h-10 ">
                        <button className="border-2 border-solid border-[var(--primary-color)] rounded-md p-2">
                            Most Liked
                        </button>
                        <button className="border-2 border-solid border-[var(--primary-color)] rounded-md p-2">
                            Most Saved
                        </button>
                        <button className="border-2 border-solid border-[var(--primary-color)] rounded-md p-2">
                            Most Commented
                        </button>
                    </div>
                    <div className="w-full h-0.5 bg-primary rounded-md"></div>
                    <div className="h-full w-full">
                        <h1 className="text-2xl font-bold text-center">Dobeto's Most Liked</h1>
                        <table className="w-full">
                            <th className="flex justify-evenly bg-primary rounded-t-md py-1">
                                <td>ola</td>
                                <td>ola</td>
                                <td>ola</td>
                            </th>
                            <tr className="flex justify-evenly bg-secondary py-1">
                                <td>Dato 1</td>
                                <td>Dato 2</td>
                                <td>Dato 3</td>
                            </tr>
                            <tr className="flex justify-evenly bg-color py-1 border-x-1 border-solid border-[var(--primary-color)]">
                                <td>Dato 1</td>
                                <td>Dato 2</td>
                                <td>Dato 3</td>
                            </tr>
                            <tr className="flex justify-evenly bg-secondary py-1">
                                <td>Dato 1</td>
                                <td>Dato 2</td>
                                <td>Dato 3</td>
                            </tr>
                            <tr className="flex justify-evenly bg-color py-1 border-x-1 border-solid border-[var(--primary-color)]">
                                <td>Dato 1</td>
                                <td>Dato 2</td>
                                <td>Dato 3</td>
                            </tr>
                            <tr className="flex justify-evenly bg-secondary py-1">
                                <td>Dato 1</td>
                                <td>Dato 2</td>
                                <td>Dato 3</td>
                            </tr>
                            <tr className="flex justify-evenly bg-color py-1 border-x-1 border-b-1 border-solid border-[var(--primary-color)] rounded-b-md">
                                <td>Dato 1</td>
                                <td>Dato 2</td>
                                <td>Dato 3</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Reports;
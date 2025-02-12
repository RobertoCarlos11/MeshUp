  import Footer from "../components/Footer";
import Header from "../components/Header";

function Reports() {
    return (
        <div className="h-screen">
            <Header />
            <div className="flex flex-row border-b-2 border-solid m-10 mt-0 mb-0">
                <div className="w-1/3"></div>
                <div className="text-base m-5 mb-0">
                    <button className="cursor-pointer bg-[var(--primary-color)] border-t-2 border-x-2 border-solid border-[var(--primary-color)] font-semibold rounded-t-sm p-3 pl-8 pr-8 m-2 mb-0">LIKES</button>
                    <button className="cursor-pointer border-t-2 border-x-2 border-solid border-[var(--primary-color)] font-semibold rounded-t-sm p-3 pl-8 pr-8 m-2 mb-0">SAVES</button>
                    <button className="cursor-pointer border-t-2 border-x-2 border-solid border-[var(--primary-color)] font-semibold rounded-t-sm p-3 pl-8 pr-8 m-2 mb-0">COMMENTS</button>
                </div>
            </div>

            <div className="h-full flex m-10 mt-0">

                <div className="w-1/3 border-r-2 border-solid p-5">
                    <h1 className="text-base font-bold m-2">Filter By</h1>

                    <div className="flex flex-col m-2">

                        <div className="flex flex-col m-2">
                            <label htmlFor="Category" className="font-semibold">Date</label>
                            <div className="flex justify-between items-center space-x-1 mt-2 mb-2">
                                <input type="date" className="text-sm border-1 border-solid border-[var(--primary-color)] rounded-sm p-1" /> 
                                <input type="date" className="text-sm border-1 border-solid border-[var(--primary-color)] rounded-sm p-1"/>
                            </div>
                        </div>
                        <div className="flex flex-col m-2">
                            <label htmlFor="Category" className="font-semibold">Category</label>
                            <select id="Category" className="text-sm border-1 border-solid border-[var(--primary-color)] rounded-sm p-1 mt-2 mb-2">
                                <option className="bg-[var(--background-color)]">Youtube</option>
                                <option className="bg-[var(--background-color)]">Youtube</option>
                                <option className="bg-[var(--background-color)]">Youtube</option>
                            </select>
                        </div>
                        <div className="flex flex-col m-2">
                            <label htmlFor="Status" className="font-semibold">Status</label>
                            <div className="flex justify-left">
                                <div className="flex space-x-2 m-2">
                                    <label class="relative flex items-center cursor-pointer" for="active">
                                        <input name="framework" type="radio" class="peer h-5 w-5 cursor-pointer appearance-none rounded-full border checked:border-comp-1 transition-all" id="active"/>
                                        <span class="absolute bg-[var(--primary-color)] w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        </span>
                                    </label>
                                    <span>Active</span>
                                </div>
                                <div className="flex space-x-2 m-2">
                                    <label class="relative flex items-center cursor-pointer" for="inactive">
                                        <input name="framework" type="radio" class="peer h-5 w-5 cursor-pointer appearance-none rounded-full border checked:border-comp-1 transition-all" id="inactive"/>
                                        <span class="absolute bg-[var(--primary-color)] w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        </span>
                                    </label>
                                    <span>Inactive</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full p-10">
                    <div className="bg-[#191F27] w-full rounded-sm p-10">
                        <div className="border-1 border-solid border-[var(--primary-color)] rounded-sm">
                            <h1 className="flex font-semibold justify-center text-xl m-4">MOST LIKED POSTS</h1>

                            <table className="w-full text-base">
                                <th className="flex bg-secondary font-semibold justify-evenly p-2">
                                    <td>POST</td>
                                    <td>CATEGORY</td>
                                    <td>LIKES</td>
                                </th>
                                <tr className="flex justify-evenly py-2">
                                    <td>Dato 1</td>
                                    <td>Dato 2</td>
                                    <td>Dato 3</td>
                                </tr>
                                <tr className="flex justify-evenly py-2">
                                    <td>Dato 1</td>
                                    <td>Dato 2</td>
                                    <td>Dato 3</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Reports;
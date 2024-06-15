import mongoose from "mongoose";

export interface IprofSubCat {
    _id: string;
    subCat: string;
}

const pofSubCatSchema = new mongoose.Schema({
    subCat: {type: String, required: true},
})

export interface IprofCat {
    _id: string;
    cat: string;
    subCats: IprofSubCat[]
}

const  porfCatSchema = new mongoose.Schema({
    cat: {type: String, required: true},
    subCats: {type: [pofSubCatSchema], required: true}
})

const ProfCategory = mongoose.models.ProfCategory || mongoose.model('ProfCategory', porfCatSchema);

export default ProfCategory;
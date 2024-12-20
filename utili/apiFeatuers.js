 export default class apiFeatuers{
    constructor(preModel,queryString){
this.preModel=preModel;
this.queryString=queryString;
    }

    pagination(){
        let page = this.queryString.page * 1 || 1
    if (this.queryString.page <= 0) page = 1
    let skip = (page - 1) * 3
    this.page=page
    this.preModel.skip(skip).limit(3)
    return this;
    }

    filter(){
        let filterObj = { ...this.queryString }
        let excludedQuery = ['page', 'sort', 'keyword', 'fields']
        excludedQuery.forEach(ele => delete filterObj[ele])
        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/\bgt|gte|lt|lte\b/g, match => `$${match}`)
        filterObj = JSON.parse(filterObj)
        this.preModel.find(filterObj)
        return this;
    
    }

    sort(){
        if (this.queryString.sort) {
            let sort = this.queryString.sort.split(",").join(" ")
            this.preModel.sort(sort)
        }
        return this
    }


    search(){
        if (this.queryString.keyword) {
            this.preModel.find({
                $or: [
                    { name: { $regex: this.queryString.keyword, $options: "i" } },
                    { description: { $regex: this.queryString.keyword, $options: "i" } }
                ]
            })
        }
    return this
    }

    fields(){
        if (this.queryString.fields) {
            let fields = this.queryString.fields.split(",").join(" ");
            this.preModel.select(fields)  
        }
        return this
        
    }
 }
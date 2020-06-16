const mongoose = require("mongoose")
const bodyParser = require('body-parser')

module.exports = class RestMongo {

  static start(settings){

    this.settings = settings;
    this.connectToMongo();

    return (...args) => new RestMongo(...args);
  }

  static connectToMongo(){
    mongoose.connect(this.settings.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .catch(error => console.log("ERROR!!! ", error))
  }

  constructor(req,res,next){
    this.req = req;
    this.res = res;
    this.next = next;

    this.settings = RestMongo.settings;

    if(this.settings.baseUrl.substr(-1) != '/'){
      this.settings.baseUrl += '/';
    }

    this.analyzeUrl();

    if(['get','post','put','delete'].includes(this.method)){
      this[this.method]();
    }

  }

  analyzeUrl(){

    let url = this.req.url;
    let method = this.req.method.toLowerCase();
    let baseUrl = this.settings.baseUrl;
    //check if "/api", if not, not our concern
    if(url.indexOf(baseUrl) != 0){
      this.next();
      return;
    }
    // remove baseUrl and split rest of url on slash
    let urlParts = url.split(baseUrl,2)[1].split('/')
    console.log(urlParts)

    //save model name in a string
    this.modelName = urlParts[0];

    //save model instance. somewhere else?
    this.model = mongoose.model(urlParts[0].split(';').join(''));

    // set properties to this
    this.id = urlParts[1]
    console.log(this.id)
    this.method = method;
  }

  async get(){
    console.log("inside get")
    // do a query with or without id to the correct table
    let result
    if(this.id){
      let queryObj = {
        name: {'$regex': this.id}
      }
     result = await this.model.find(queryObj);
    } else{
     result = await this.model.find();

  }

    //we could also use query() ?
    //let result = await this.query(queryObj);

    this.res.json(result);
  }

  async post(){
    console.log("THIS IS THE BODY");
    console.log(JSON.stringify(this.req.body))
    let saveObj = {
      name: this.req.body.username,
      email: this.req.body.email,
      password: this.req.body.password
    }
    let newObj = await new this.model(saveObj)
    newObj.save();
    this.res.json(this.req.body);

  }

  //not use?
  async query(query,params){
    let result = await this.model.find(query);
    return result;
  }


}

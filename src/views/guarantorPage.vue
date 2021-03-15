<template>
  <div class="dashboard">
    <div class="background-design"></div>
    <Menu></Menu>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="main-dashboard">
            <div class="dashboard-greeting">
              <div class="overview-text">
                <font-awesome-icon icon="exchange-alt" />
                <div class="header-title">Request</div>
              </div>
              <div class="date">
                <font-awesome-icon icon="clock" />
                <div class="date-item ml-2">{{new Date().toLocaleString() | humanize}}</div>
              </div>
            </div>
            <div class="line"></div>
            <div class="row">
              <div class="col-md-12">
                <div class="overview-board">
                  <div class="account-overview">
                    <div class="account-overview-content">
                        <div class="profile-image">
                        <p class="profile-name"><strong>
                        <h4> CEMCS Member with the details below has requested that you be His/Her Guarantor for the Loan Amount specifield</h4>
                            </strong>
                        </p><br/>
                               <h3> <code>Requested Loan Amount :    </code></h3>
                        </div>
                        <div class=col-md-8>
                                <b-table-simple striped hover>
                                    <b-tr>
                                        <b-th >
                                            Member's Employee Number :
                                        </b-th>
                                    </b-tr>
                                    <b-tr>
                                        <b-th>
                                            Member Full-Name :
                                        </b-th>
                                    </b-tr> 
                                    <b-tr>
                                        <b-th >
                                            Member Extention/Mobile :
                                        </b-th>
                                    </b-tr>
                                    <b-tr>
                                        <b-th>
                                            Member Email Address :
                                        </b-th>
                                    </b-tr>                                                 
                                </b-table-simple>
                                <div>
                                  <b-form-textarea
                                    id="textarea"
                                    v-model="comment"
                                    placeholder="Type in comment..."
                                    rows="3"
                                    max-rows="6"
                                  ></b-form-textarea>
                                  <pre class="mt-3 mb-0">{{ comment }}</pre>
                                </div> 
                                <div class="form-buttons">
                                  <b-button class="form-btn">Approve</b-button>
                                  <b-button class="form-btn" @click="addComment">Reject</b-button>
                                </div>                         
                            </div>
                            <!-- <div class="profile-image">
                                <span><a href="http://localhost:8080">Click here to accept this request</a></span>
                            </div> -->
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="col-md-4">
                <div class="dashboard-right-side-bar">
                  <div class="header_2">Profile</div>
                  <RightSidebar></RightSidebar>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "../components/layout/headers/menus.vue";
import Footer from "../components/layout/footer/footer.vue";


export default {
  name: "Home",
  components: {
    Menu,
    Footer,
  },
  data () {
    return {
      comment: ''
    }
  },
  method: {
    
  }
};
</script>

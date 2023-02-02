<template>
  <section class="content">
    <div>
      <!-- id将作为查询条件 -->
      <span class="leancloud-visitors" data-flag-title="Your Article Title">
        <em class="post-meta-item-text">阅读量：</em>
        <i class="leancloud-visitors-count"></i>
      </span>
    </div>
    <h3>
      <a href="javascript:;"></a>
      评 论：
    </h3>
    <div id="vcomments"></div>
  </section>
</template>
<script>
export default {
  name: "Valine",
  mounted: function () {
    const Valine = require("valine");
    if (typeof window !== "undefined") {
      document.getElementsByClassName("leancloud-visitors")[0].id =
        window.location.pathname;
      this.window = window;
      window.AV = require("leancloud-storage");
    }

    new Valine({
      el: "#vcomments",
      appId: "yQSZoPRxSRegktqmbDe4RySR-gzGzoHsz",
      appKey: "6laUmSNffVmwOSuouSr7NtTu",
      notify: false,
      verify: false,
      path: window.location.pathname,
      visitor: true,
      avatar: "mm",
      placeholder: "write here",
    });
  },
};
</script>
<style>
.content {
  border-top: 2px solid #eaecef;
  padding-top: 1rem;
  margin-top: 2rem;
}
</style>

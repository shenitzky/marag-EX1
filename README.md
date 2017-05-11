# marag-EX1
Web-services ex1 project

reality-show-vod API:

Method: GET /getAllRealityShows

Parameter: None

return Json list of all reality shows grouped by janner


Method:POST /getRealityShowById

Parameter: id (int)

return Json with requested show

Errors: If show id not exists


Method: GET /getRealityShowByJannerAndRating

Parameter: janner (string), minRating (int), maxRating(int)

return Json with requested show with rating on range between the minRating to maxRatin grouped by requested janner

Errors: If janner not exists, if rating argument illigal, if minRating > maxRating


In case of error Json from thre following stracture will return:


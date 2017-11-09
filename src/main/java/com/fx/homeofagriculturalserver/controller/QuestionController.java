package com.fx.homeofagriculturalserver.controller;

import com.fx.homeofagriculturalserver.common.constants.Constants;
import com.fx.homeofagriculturalserver.common.controller.BaseController;
import com.fx.homeofagriculturalserver.common.exception.MyServerException;
import com.fx.homeofagriculturalserver.common.response.ApiResult;
import com.fx.homeofagriculturalserver.entity.AddQuestion;
import com.fx.homeofagriculturalserver.entity.Answer;
import com.fx.homeofagriculturalserver.entity.Question;
import com.fx.homeofagriculturalserver.entity.UserElement;
import com.fx.homeofagriculturalserver.service.AnswerService;
import com.fx.homeofagriculturalserver.service.ImageService;
import com.fx.homeofagriculturalserver.service.QuestionService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@RestController("question")
@Slf4j
public class QuestionController extends BaseController {

    @Autowired
    @Qualifier("questionServiceImpl")
    private QuestionService questionService;

    @Autowired
    @Qualifier("answerServiceImpl")
    private AnswerService answerService;

    @Autowired
    @Qualifier("imageServiceImpl")
    private ImageService imageService;

    @GetMapping("showQuestion/{date}")
    public ApiResult<List<Question>> showAll(@PathVariable("date") Date lastDate) {
        ApiResult<List<Question>> resp = new ApiResult<>();
        try {
            List<Question> questions = questionService.findAllByPage(lastDate);
            resp.setData(questions);
            resp.setMessage("查询成功");
        } catch (MyServerException e) {
            resp.setCode(e.getStatusCode());
            resp.setMessage(e.getMessage());
        } catch (Exception e) {
            log.error("Fail to query", e);
            resp.setCode(Constants.RESP_STATUS_INTERNAL_ERROR);
            resp.setMessage("内部错误");
        }
        return resp;
    }

    @GetMapping("show/{date}/{type}")
    public ApiResult<List<Question>> showByType(@PathVariable("date") Date lastDate, @PathVariable("type") Integer type) {
        ApiResult<List<Question>> resp = new ApiResult<>();
        try {
            List<Question> questions = questionService.findTypeByPage(lastDate, type);
            resp.setData(questions);
            resp.setMessage("查询成功");
        } catch (MyServerException e) {
            resp.setCode(e.getStatusCode());
            resp.setMessage(e.getMessage());
        } catch (Exception e) {
            log.error("Fail to query", e);
            resp.setCode(Constants.RESP_STATUS_INTERNAL_ERROR);
            resp.setMessage("内部错误");
        }
        return resp;
    }

    @PostMapping("addQuestion")
    public ApiResult addQuestion(@RequestBody Question question, @RequestParam(required = false) MultipartFile file) {
        ApiResult resp = new ApiResult();
        try {
            if (StringUtils.isBlank(question.getContent()) || StringUtils.isBlank(question.getTitle())) {
                throw new MyServerException("标题或内容不许为空");
            }
            UserElement userElement = getCurrentUser();
            questionService.addQuestion(userElement.getTel(), question);
            if (file != null) {
                imageService.uploadImage((byte) 0, question.getId(), file);
            }
        } catch (MyServerException e) {
            resp.setCode(e.getStatusCode());
            resp.setMessage(e.getMessage());
        } catch (Exception e) {
            log.error("Fail to query", e);
            resp.setCode(Constants.RESP_STATUS_INTERNAL_ERROR);
            resp.setMessage("内部错误");
        }
        return resp;
    }

    @DeleteMapping("{id}")
    public ApiResult deleteQuestion(@PathVariable("id") Integer id) {
        ApiResult resp = new ApiResult();
        try {
            UserElement userElement = getCurrentUser();
            questionService.deleteQuestion(userElement.getTel(), id);
        } catch (MyServerException e) {
            resp.setCode(e.getStatusCode());
            resp.setMessage(e.getMessage());
        } catch (Exception e) {
            log.error("Fail to query", e);
            resp.setCode(Constants.RESP_STATUS_INTERNAL_ERROR);
            resp.setMessage("内部错误");
        }
        return resp;
    }

    @PutMapping("{id}")
    public ApiResult changeQuestion(@PathVariable("id") Integer questionId, @RequestBody Question question, @RequestParam(required = false) MultipartFile file) {
        ApiResult resp = new ApiResult();
        try {
            if (StringUtils.isBlank(question.getContent()) || StringUtils.isBlank(question.getTitle())) {
                throw new MyServerException("标题或内容不许为空");
            }
            question.setId(questionId);
            UserElement userElement = getCurrentUser();
            questionService.changeQuestion(userElement.getTel(), question, file);
        } catch (MyServerException e) {
            resp.setCode(e.getStatusCode());
            resp.setMessage(e.getMessage());
        } catch (Exception e) {
            log.error("Fail to query", e);
            resp.setCode(Constants.RESP_STATUS_INTERNAL_ERROR);
            resp.setMessage("内部错误");
        }
        return resp;
    }

    @GetMapping("{id}/answer")
    public ApiResult<List<Answer>> showAnswersOfQuestion(@PathVariable("id") Integer questionId) {
        ApiResult<List<Answer>> resp = new ApiResult<>();
        try {
            List<Answer> answers = answerService.findAllOfQuestion(questionId);
            resp.setData(answers);
            resp.setMessage("查询成功");
        } catch (MyServerException e) {
            resp.setCode(e.getStatusCode());
            resp.setMessage(e.getMessage());
        } catch (Exception e) {
            log.error("Fail to query", e);
            resp.setCode(Constants.RESP_STATUS_INTERNAL_ERROR);
            resp.setMessage("内部错误");
        }
        return resp;
    }

    @PostMapping("{id}/answer")
    public ApiResult addAnswersOfQuestion(@PathVariable("id") Integer questionId, @RequestBody Answer answer, @RequestParam(required = false) MultipartFile file) {
        ApiResult resp = new ApiResult();
        try {
            if (StringUtils.isBlank(answer.getContent())) {
                throw new MyServerException("内容不许为空");
            }
            UserElement userElement = getCurrentUser();
            answerService.addNewAnswer(userElement.getTel(), questionId, answer);
            if (file != null) {
                imageService.uploadImage((byte) 1, answer.getId(), file);
            }
            resp.setMessage("添加回答成功");
        } catch (MyServerException e) {
            resp.setCode(e.getStatusCode());
            resp.setMessage(e.getMessage());
        } catch (Exception e) {
            log.error("Fail to query", e);
            resp.setCode(Constants.RESP_STATUS_INTERNAL_ERROR);
            resp.setMessage("内部错误");
        }
        return resp;
    }

    @PutMapping("{id}/answer/{answerId}")
    public ApiResult changeAnswersOfQuestion() {
        return null;
    }

    @DeleteMapping("{id}/answer/{answerId}")
    public ApiResult deleteAnswersOfQuestion() {
        return null;
    }

    @PostMapping("{answerId}/{addId}")
    public ApiResult addQuestionToAnswer(@PathVariable("answerId") Integer answerId, @PathVariable("addId") Integer addId, @RequestBody AddQuestion addQuestion) {
        ApiResult resp = new ApiResult();
        try {
            if (addId != null) {
                addQuestion.setAddId(addId);
            }
            UserElement userElement = getCurrentUser();
            answerService.addNewQuestionToAnswer(answerId, addQuestion,userElement.getTel());
        } catch (MyServerException e) {
            resp.setCode(e.getStatusCode());
            resp.setMessage(e.getMessage());
        } catch (Exception e) {
            log.error("Fail to query", e);
            resp.setCode(Constants.RESP_STATUS_INTERNAL_ERROR);
            resp.setMessage("内部错误");
        }
        return null;
    }

    @DeleteMapping("{id}/{answerId}/{addId}")
    public ApiResult deleteQuestionToAnswer() {
        return null;
    }
}
